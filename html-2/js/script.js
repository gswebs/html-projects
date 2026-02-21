let clickStart = null;

document.addEventListener('mousedown', e => {
    if (e.target.closest('a')) {
        clickStart = performance.now();
    }
});

document.addEventListener('mouseup', e => {
    if (clickStart !== null) {
        const duration = performance.now() - clickStart;
        console.log(`Button ${e.button} held for ${duration.toFixed(1)}ms`);
        clickStart = null;
    }
});