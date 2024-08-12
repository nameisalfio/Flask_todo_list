document.addEventListener('DOMContentLoaded', function() {
    const taskContainers = document.querySelectorAll('.task-container');

    taskContainers.forEach(task => {
        task.draggable = true;
        task.addEventListener('dragstart', handleDragStart);
        task.addEventListener('dragover', handleDragOver);
        task.addEventListener('drop', handleDrop);
    });

    function handleDragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.dataset.id);
    }

    function handleDragOver(e) {
        e.preventDefault();
    }

    function handleDrop(e) {
        e.preventDefault();
        const draggedId = e.dataTransfer.getData('text/plain');
        const targetId = e.target.closest('.task-container').dataset.id;

        // Update the positions in the DOM
        const draggedElem = document.querySelector(`.task-container[data-id='${draggedId}']`);
        const targetElem = document.querySelector(`.task-container[data-id='${targetId}']`);
        
        if (draggedElem && targetElem) {
            const parent = targetElem.parentElement;
            parent.insertBefore(draggedElem, targetElem);

            updateTaskOrder();
        }
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
