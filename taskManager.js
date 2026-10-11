class Task {
    constructor(id, title, completed) {
        // id özelliğini salt okunur (read-only) ve değiştirilemez yapıyoruz
        Object.defineProperty(this, 'id', {
            value: id,
            writable: false,
            enumerable: true, // konsolda ve JSON'da görünmesi için
            configurable: false
        });
        
        this.title = title;
        this.completed = completed;
    }

    // completed değerini tersine çevirip "YENİ" bir Task objesi döndürür
    toggle() {
        return new Task(this.id, this.title, !this.completed);
    }
}

class TaskManager {
    constructor() {
        this.tasks = [];
    }

    // Görevleri immutability kuralına uyarak kopyalar
    setTasks(tasks) {
        this.tasks = [...tasks];
    }

    // Mevcut diziyi bozmadan yeni görevi ekler
    addTask(task) {
        this.tasks = [...this.tasks, task];
    }

    // Silinecek id hariç diğerlerini filtreleyerek yeni bir dizi oluşturur
    removeTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
    }

    // Tıklanan görevi bulup toggle() metodunu çağırır, diğerlerini aynen bırakır
    toggleTask(taskId) {
        this.tasks = this.tasks.map(task => 
            task.id === taskId ? task.toggle() : task
        );
    }
}
