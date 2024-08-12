document.addEventListener('DOMContentLoaded', function() {
    const taskContainers = document.querySelectorAll('.task-container');

    taskContainers.forEach(task => {
        task.draggable = true;
        task.addEventListener('dragstart', handleDragStart);
        task.addEventListener('dragover', handleDragOver);
        task.addEventListener('drop', handleDrop);
        task.addEventListener('dragend', handleDragEnd); 
    });

    function handleDragStart(e) {
        e.target.classList.add('dragging'); 
        e.dataTransfer.setData('text/plain', e.target.dataset.id);
    }

    function handleDragOver(e) {
        e.preventDefault();
        const target = e.target.closest('.task-container');
        if (target) {
            target.classList.add('drag-over'); 
        }
    }

    function handleDrop(e) {
        e.preventDefault();
        const draggedId = e.dataTransfer.getData('text/plain');
        const targetId = e.target.closest('.task-container').dataset.id;

        const draggedElem = document.querySelector(`.task-container[data-id='${draggedId}']`);
        const targetElem = document.querySelector(`.task-container[data-id='${targetId}']`);
        
        if (draggedElem && targetElem) {
            const parent = targetElem.parentElement;
            parent.insertBefore(draggedElem, targetElem);

            updateTaskOrder();
        }

        const target = e.target.closest('.task-container');
        if (target) {
            target.classList.remove('drag-over');
        }
    }

    function handleDragEnd(e) {
        e.target.classList.remove('dragging'); 
        document.querySelectorAll('.task-container').forEach(task => {
            task.classList.remove('drag-over');
        });
    }

    function updateTaskOrder() {
        const updatedOrder = [];
        document.querySelectorAll('.task-container').forEach((task, index) => {
            updatedOrder.push({
                id: task.dataset.id,
                position: index + 1
            });
        });

        fetch('/update_task_order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ order: updatedOrder }),
        });
    }
});
