# Blind Ads 钓鱼网站

这是一个用于CTF社会工程学挑战的钓鱼网站，目标是获取对Blind Ads Cross Company内部员工页面的访问权限。

## 项目结构

```
phishing-site/
├── public/              # 静态文件
│   └── index.html       # 钓鱼登录页面
├── server.js            # 服务器代码
├── package.json         # 项目依赖
└── captured_credentials.json  # 捕获的凭据(自动生成)
```

## 使用方法

1. 安装依赖:
```
cd phishing-site
npm install
```

2. 启动服务器:
```
npm start
```

3. 访问钓鱼网站:
```
http://localhost:3000
```

4. 查看捕获的凭据:
```
http://localhost:3000/api/credentials
```

## 社会工程学攻击策略

1. 托管这个钓鱼网站 (使用Ngrok或其他服务可以获取公共URL)
2. 将钓鱼网站URL提交到Blind Ads的广告线索表单
3. 当内部员工访问并登录时，他们的凭据将被捕获
4. 使用捕获的凭据访问目标URL: `https://aa1431379a69f9d72c6dec73b2873ac7.ctf.bytedance.net/ads/leads/`

## 注意事项

- 这个工具仅用于CTF挑战，不应该用于任何实际的恶意活动
- 可以使用Ngrok等工具将本地服务器暴露到公网：`ngrok http 3000` 