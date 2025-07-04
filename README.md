# 📲 WhatsApp Reminder Bot using Baileys

This project is a simple and effective WhatsApp bot built using [Baileys v7+](https://github.com/WhiskeySockets/Baileys) that allows users to schedule reminders to any WhatsApp number directly by sending a command from their own WhatsApp account.

---

## 🚀 Features

* 🗕️ Schedule WhatsApp reminders to others
* ✅ Receive confirmation messages instantly in your WhatsApp
* ⏰ Supports time-based one-time reminders
* 🧞 Simple command-based interaction: `/remind <number> <HH:MM> <message>`
* 🔒 Runs fully on your machine, no cloud required

---

## 🛠️ Technologies Used

* [Node.js](https://nodejs.org/)
* [Baileys v7+](https://github.com/WhiskeySockets/Baileys) - WhatsApp Web API
* [node-schedule](https://www.npmjs.com/package/node-schedule) - Task scheduling
* [qrcode](https://www.npmjs.com/package/qrcode) - Terminal-based QR code display

---

## 📦 Installation

1. **Clone this repository**

   ```bash
   git clone https://github.com/<your-username>/whatsapp-reminder-bot.git
   cd whatsapp-reminder-bot
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the bot**

   ```bash
   node index.js
   ```

4. **Scan the QR code** using your WhatsApp app → Linked Devices

---

## 💬 Usage

To schedule a message:

```
/remind <WhatsAppNumber> <HH:MM> <Message>
```

✅ Example:

```
/remind 919876543210 20:15 Drink water!
```

This will send a message saying `⏰ Reminder: Drink water!` to `+91 98765 43210` at 8:15 PM.

You will receive:

```
✅ Reminder set!
📲 To: 919876543210
🕒 At: 20:15
📝 Message: Drink water!
```

---

## 📁 Files

* `index.js` – Main logic for connecting to WhatsApp, parsing reminder commands, scheduling and sending messages

---

## ⚠️ Notes

* Your WhatsApp account (used to scan QR) acts as the **controller**
* Messages are sent from your own WhatsApp to **any valid WhatsApp user**
* Make sure the number you send to is a **valid, active WhatsApp user**

---

## 🧐 Future Improvements (optional)

* Add recurring reminders (daily/weekly)
* `/list` command to view upcoming reminders
* Store reminders in a JSON/DB file
* Cancel reminders with `/cancel`

---

## 👨‍💻 Author

* **Bezawada Priya Vardhan**
* B.Tech, SAHE University
* Passionate about AI, Bots, and Automation

---

## 📜 License

This project is open source under the [MIT License](LICENSE).
