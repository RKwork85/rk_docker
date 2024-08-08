import { ElNotification } from 'element-plus'


class Notification {
    info(title, message = '提示') {
        return this.showNotification('info', title, message);
    }

    success(title, message = '成功') {
        return this.showNotification('success', title, message);
    }

    warning(title, message = '警告') {
        return this.showNotification('warning', title, message);
    }

    error(title, message = '错误') {
        return this.showNotification('error', title, message);
    }

    showNotification(type, title, message) {
        return ElNotification[type]({
            message,
            title,
        });
    }


   
}


export const dsNotification = new Notification();
