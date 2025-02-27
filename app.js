document.addEventListener("DOMContentLoaded", function() {
    let botao = document.createElement("a");
    botao.href = "https://www.instagram.com/labemunisul/?api=1%2F&hl=zh-cn";
    botao.target = "_blank";
    botao.className = "instagram-float";
    
    let icon = document.createElement("i");
    icon.className = "fab fa-instagram";
    
    botao.appendChild(icon);
    document.body.appendChild(botao);
    
    let style = document.createElement("style");
    style.innerHTML = `
        .instagram-float {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
            color: white;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            transition: transform 0.3s ease;
            z-index: 9999;
           
        }
        .instagram-float:hover {
            transform: scale(1.1);
            opacity: 0.9;
        }
        .instagram-float i {
            font-size: 28px;
        }
    `;
    document.head.appendChild(style);
});