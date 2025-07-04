const {
  default: makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  DisconnectReason
} = require('@whiskeysockets/baileys');
const qrcode = require('qrcode');
const schedule = require('node-schedule');

async function startSock() {
  const { state, saveCreds } = await useMultiFileAuthState('auth_info');
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    auth: state
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      console.log('📱 Scan this QR code to connect:\n');
      console.log(await qrcode.toString(qr, { type: 'terminal', small: true }));
    }

    if (connection === 'close') {
      const shouldReconnect =
        lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      console.log('❌ Disconnected. Reconnecting:', shouldReconnect);
      if (shouldReconnect) startSock();
    } else if (connection === 'open') {
      console.log('✅ WhatsApp connected!');
    }
  });

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message) return;

    const from = msg.key.remoteJid;

    const text =
      msg.message.conversation ||
      msg.message?.extendedTextMessage?.text ||
      msg.message?.imageMessage?.caption ||
      '';

    console.log(`💬 Message from ${from}: ${text}`);

    if (text.startsWith('/remind')) {
      const parts = text.trim().split(' ');
      if (parts.length < 4) {
        await sock.sendMessage(from, {
          text: '❗ Usage: /remind <number> <HH:MM> <message>'
        });
        return;
      }

      const number = parts[1].replace(/[^0-9]/g, '');
      const time = parts[2];
      const reminderMessage = parts.slice(3).join(' ');

      const [hours, minutes] = time.split(':').map(Number);
      if (isNaN(hours) || isNaN(minutes)) {
        await sock.sendMessage(from, {
          text: '⏰ Invalid time format. Use HH:MM (24-hour).'
        });
        return;
      }

      const now = new Date();
      const sendTime = new Date();
      sendTime.setHours(hours);
      sendTime.setMinutes(minutes);
      sendTime.setSeconds(0);

      if (sendTime < now) sendTime.setDate(sendTime.getDate() + 1);

      const jid = number + '@s.whatsapp.net';

      schedule.scheduleJob(sendTime, async () => {
        try {
          await sock.sendMessage(jid, {
            text: `⏰ Reminder: ${reminderMessage}`
          });
          console.log(`✅ Reminder sent to ${number}`);
        } catch (err) {
          console.error(`❌ Failed to send to ${number}:`, err);
        }
      });

      // ✅ Send confirmation back to you (the controller)
      await sock.sendMessage(from, {
        text: `✅ Reminder set!\n📲 To: ${number}\n🕒 At: ${time}\n📝 Message: ${reminderMessage}`
      });
    }
  });
}

startSock();
