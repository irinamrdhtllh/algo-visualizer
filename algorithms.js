export async function insertionSort(nums, callback) {
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

export async function mergeSort(nums, callback) {
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
                nums[k] = R[j]
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
        await sort(nums, q, r)
        await merge(nums, p, q, r)
    }
    let p = 0;
    let r = nums.length;
    await sort(nums, p, r);
    await callback();
}