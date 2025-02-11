const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Настройка почтового транспорта
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ваша.почта@gmail.com', // Замените на вашу почту
        pass: 'ваш_пароль_приложения' // Замените на пароль приложения Gmail
    }
});

// Обработка отправки формы
app.post('/send-email', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        // Отправляем письмо
        await transporter.sendMail({
            from: 'ваша.почта@gmail.com', // Замените на вашу почту
            to: 'alexey.momot@example.com', // Замените на почту получателя
            subject: 'Новая заявка с сайта',
            html: `
                <h3>Новая заявка с сайта</h3>
                <p><strong>Имя:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Сообщение:</strong></p>
                <p>${message}</p>
            `
        });

        res.status(200).json({ message: 'Сообщение отправлено успешно' });
    } catch (error) {
        console.error('Ошибка отправки:', error);
        res.status(500).json({ message: 'Ошибка отправки сообщения' });
    }
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});