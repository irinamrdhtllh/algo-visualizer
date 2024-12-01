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