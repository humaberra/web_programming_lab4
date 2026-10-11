// TaskManager örneğini (instance) oluşturuyoruz
const taskManager = new TaskManager();

// DOM Elementlerini seçiyoruz
const loadTasksBtn = document.getElementById('loadTasksBtn');
const statusMessage = document.getElementById('statusMessage');
const taskList = document.getElementById('taskList');

// Görevleri ekrana çizdiren (render) fonksiyon
const renderTasks = () => {
    // Önce listeyi temizle
    taskList.innerHTML = '';

    // taskManager içindeki her bir task için DOM elemanları oluştur
    taskManager.tasks.forEach(task => {
        // Ana div (<div class="task">)
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        
        // Görev tamamlandıysa css class'ını ekle
        if (task.completed) {
            taskDiv.classList.add('completed');
        }

        // Başlık (<span>)
        const titleSpan = document.createElement('span');
        titleSpan.textContent = task.title;

        // Toggle (Değiştir) Butonu
        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = task.completed ? 'Undo' : 'Complete';
        
        // Toggle için Event Listener (Inline HTML yerine doğrudan event ekliyoruz)
        toggleBtn.addEventListener('click', () => {
            taskManager.toggleTask(task.id);
            renderTasks(); // State değiştiği için ekranı yeniden çizdir
        });

        // Delete (Sil) Butonu
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        
        // Delete için Event Listener
        deleteBtn.addEventListener('click', () => {
            taskManager.removeTask(task.id);
            renderTasks(); // State değiştiği için ekranı yeniden çizdir
        });

        // Oluşturduğumuz elementleri ana div'in içine koyuyoruz (appendChild)
        taskDiv.appendChild(titleSpan);
        taskDiv.appendChild(toggleBtn);
        taskDiv.appendChild(deleteBtn);

        // En son bu ana div'i ekrandaki listeye ekliyoruz
        taskList.appendChild(taskDiv);
    });
};

// "Load Tasks" butonuna tıklanınca çalışacak asenkron olay (Event Listener)
loadTasksBtn.addEventListener('click', async () => {
    try {
        // 1. Yükleniyor mesajını göster
        statusMessage.textContent = 'Loading tasks...';
        taskList.innerHTML = ''; // Eski listeyi temizle (varsa)

        // 2. api.js'den veriyi bekle (async/await)
        const rawData = await fetchTasks();

        // 3. ÖDEVDE İSTENEN ZORUNLULUK: JSON.stringify ve JSON.parse kullanımı
        const jsonString = JSON.stringify(rawData);
        const parsedData = JSON.parse(jsonString);

        // 4. Ham (raw) objeleri Task sınıfı örneklerine dönüştür
        const taskInstances = parsedData.map(
            taskObj => new Task(taskObj.id, taskObj.title, taskObj.completed)
        );

        // 5. Görevleri TaskManager'a aktar (Immutability kuralına uyarak)
        taskManager.setTasks(taskInstances);

        // 6. Ekrana çizdir ve yükleniyor mesajını temizle
        renderTasks();
        statusMessage.textContent = '';

    } catch (error) {
        // Hata (Error Handling) durumu
        statusMessage.textContent = 'Error loading tasks. Please try again.';
        console.error('Fetch error:', error);
    }
});