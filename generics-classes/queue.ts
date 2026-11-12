class Queue<T> {
    private items: T[] = [];
    enqueue(item: T): void {
        this.items.push(item);
    }
    dequeue(): T | undefined {
        return this.items.shift();
    }
    size(): number {
        return this.items.length;
    }
}

const q = new Queue<string>();
q.enqueue("a");
q.enqueue("b");
q.dequeue();   // "a"
q.size();      // 1

// q.enqueue(42);   // має бути помилка