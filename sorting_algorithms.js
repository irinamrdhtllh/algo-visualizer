// Insertion sort algorithm
async function insertionSort(nums, callback) {
    for (let i = 1; i < nums.length; i++) {
        const key = nums[i];
        let j = i - 1;
        while (j >= 0 && nums[j] > key) {
            nums[j + 1] = nums[j];
            await callback(j + 1);
            j--;
        }
        nums[j + 1] = key;
        await callback(j + 1);
    }
    await callback();
}

// Merge sort algorithm
async function mergeSort(nums, callback) {
    async function merge(nums, p, q, r) {
        let n_L = q - p;
        let n_R = r - q;
        let L = nums.slice(p, q);
        let R = nums.slice(q, r);

        let i = 0;
        let j = 0;
        let k = p;
        while (i < n_L && j < n_R) {
            if (L[i] <= R[j]) {
                nums[k] = L[i];
                await callback(k);
                i++;
            } else {
                nums[k] = R[j];
                await callback(k);
                j++;
            }
            k++;
        }
        while (i < n_L) {
            nums[k] = L[i];
            await callback(k);
            i++;
            k++;
        }
        while (j < n_R) {
            nums[k] = R[j];
            await callback(k);
            j++;
            k++;
        }
    }

    async function sort(nums, p, r) {
        if (p >= r - 1) {
            return;
        }
        let q = Math.floor((p + r) / 2);
        await sort(nums, p, q);
        await sort(nums, q, r);
        await merge(nums, p, q, r);
    }

    let p = 0;
    let r = nums.length;
    await sort(nums, p, r);
    await callback();
}

// Heap sort algorithm
async function heapSort(nums, callback) {
    class Heap {
        constructor(array) {
            this.array = array;
            this.heapSize = array.length;
        }
        get(index) {
            return this.array[index];
        }
        set(index, value) {
            this.array[index] = value;
        }
        length() {
            return this.array.length;
        }
        toString() {
            return this.array.toString();
        }
    }

    async function buildMaxHeap(heap) {
        let n = Math.floor((heap.heapSize - 1) / 2);
        for (let i = n; i >= 0; i--) {
            await maxHeapify(heap, i);
        }
    }

    async function maxHeapify(heap, i) {
        let l = 2 * i + 1;
        let r = 2 * i + 2;
        let largest = i;
        if (l < heap.heapSize && heap.get(l) > heap.get(i)) {
            largest = l;
        } else {
            largest = i;
        }
        if (r < heap.heapSize && heap.get(r) > heap.get(largest)) {
            largest = r;
        }
        if (largest !== i) {
            let temp = heap.get(i);
            heap.set(i, heap.get(largest));
            heap.set(largest, temp);
            await callback(i);
            await callback(largest);
            await maxHeapify(heap, largest);
        }
    }

    let heap = new Heap(nums);
    await buildMaxHeap(heap);
    for (let i = heap.length() - 1; i > 0; i--) {
        let temp = heap.get(i);
        heap.set(i, heap.get(0));
        heap.set(0, temp);
        heap.heapSize -= 1;
        await callback(i);
        await maxHeapify(heap, 0);
    }
    await callback();
}

// Quick sort algorithm
async function quickSort(nums, callback) {
    async function partition(nums, p, r) {
        let x = nums[r - 1];
        let i = p - 1;
        for (let j = p; j < r - 1; j++) {
            if (nums[j] <= x) {
                i++;
                let temp = nums[j];
                nums[j] = nums[i];
                nums[i] = temp;
                await callback(j);
                await callback(i);
            }
        }
        let temp = nums[r - 1];
        nums[r - 1] = nums[i + 1];
        nums[i + 1] = temp;
        await callback(r - 1);
        await callback(i + 1);

        return i + 1;
    }

    async function sort(nums, p, r) {
        if (p < r - 1) {
            let q = await partition(nums, p, r);
            await sort(nums, p, q);
            await sort(nums, q + 1, r);
        }
    }

    await sort(nums, 0, nums.length);
    await callback();
}

// Selection sort algorithm
async function selectionSort(nums, callback) {
    for (let i = 0; i < nums.length; i++) {
        let min_index = i;
        for (let j = i; j < nums.length; j++) {
            if (nums[min_index] > nums[j]) {
                min_index = j;
            }
        }
        let temp = nums[i];
        nums[i] = nums[min_index];
        nums[min_index] = temp;
        await callback(i);
        await callback(min_index);
    }
    await callback();
}

export { insertionSort, mergeSort, heapSort, quickSort, selectionSort };
