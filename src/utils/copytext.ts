import { tips } from "@/utils/tips";
export const copyText = (text: string) => {
    if (navigator.clipboard && window.isSecureContext) {
        // navigator clipboard 向剪贴板写文本
        tips('success', '已复制到剪贴板')
        return navigator.clipboard.writeText(text);
    } else {
        // 创建text area
        let textArea = document.createElement("textarea");
        textArea.value = text;
        // 使text area不在viewport，同时设置不可见
        textArea.style.position = "absolute";
        textArea.style.opacity = '0';
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        return new Promise((res, rej) => {
            // 执行复制命令并移除文本框
            tips('success', '已复制到剪贴板')
            document.execCommand('copy') ? res(null) : rej();
            textArea.remove();
        });
    }
};