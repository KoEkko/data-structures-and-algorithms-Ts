class hashTable<T = any> {
  // 创建一个数组,用来存放链地址法中的链
  storage: [string, T][][] = [];
  // 定义数组的长度
  private length: number = 7;
  // 记录已经存放元素的个数
  private count: number = 0;

  // hashFunc
  private hashFunc(key: string, max: number): number {
    let hashCode = 0;
    const length = key.length;
    for (let i = 0; i < length; i++) {
      hashCode = 31 * hashCode + key.charCodeAt(i);
    }
    const index = hashCode % max;
    return index;
  }
  private isPrime(num: number): boolean {
    const sqrt = Math.sqrt(num);
    for (let i = 2; i <= sqrt; i++) {
      if (num % i === 0) {
        return false;
      }
    }
    return true;
  }
  private getNextPrime(num: number): number {
    let newPrime = num;
    while (!this.isPrime(newPrime)) {
      newPrime++;
    }
    return newPrime;
  }
  // 扩容/缩容
  private resize(newLength: number) {
    
    // 设置新的长度
    let newPrime = this.getNextPrime(newLength);
    if(newPrime < 7) {
      newPrime = 7
    }
    this.length = newPrime
    console.log("获到的容量质数：",newPrime);
    // 获取原来所有的数据，并且重新放入到新的storage
    // 1.对数据进行初始化
    const oldStorag = this.storage;
    this.storage = [];
    this.count = 0;

    oldStorag.forEach((bucket) => {
      if (!bucket) return;
      for (let i = 0; i < bucket.length; i++) {
        const tuple = bucket[i];
        this.put(tuple[0], tuple[1]);
      }
    });
  }

  // 插入/修改的操作
  put(key: string, value: T) {
    // 1.根据key获取数组中对应的索引值
    const index = this.hashFunc(key, this.length);

    // 2.取出索引值对应位置的数组
    let bucket = this.storage[index];

    // 3.判断bucket是否有值
    if (!bucket) {
      bucket = [];
      this.storage[index] = bucket;
    }

    // 确定bucket有值了
    let isUpdated = false;
    for (let i = 0; i < bucket.length; i++) {
      const tuple = bucket[i];
      const tupleKey = tuple[0];
      if (tupleKey === key) {
        isUpdated = true;
        tuple[1] = value;
      }
    }

    // 没有更新的话，就是添加
    if (!isUpdated) {
      bucket.push([key, value]);
      this.count++;

      // 扩容，如果loadFactor大于0.75
      const loadFactor = this.count / this.length;
      if (loadFactor > 0.75) {
        this.resize(this.length * 2);
      }
    }
  }

  // 获取值
  get(key: string): T | undefined {
    const index = this.hashFunc(key, this.length);
    const bucket = this.storage[index];
    if (!bucket) return undefined;

    for (let i = 0; i < bucket.length; i++) {
      const tuple = bucket[i];
      const tupleKey = tuple[0];
      const tupleValue = tuple[1];
      if (key === tupleKey) {
        return tupleValue;
      }
    }
    return undefined;
  }

  // 删除
  delete(key: string): T | undefined {
    const index = this.hashFunc(key, this.length);

    const bucket = this.storage[index];
    if (!bucket) return undefined;
    for (let i = 0; i < bucket.length; i++) {
      const tuple = bucket[i];
      const tupleKey = tuple[0];
      const tupleValue = tuple[1];
      if (tupleKey === key) {
        bucket.splice(i, 1);
        this.count--;
        // 缩容, 如果loadFactor小于0.25
        const loadFactor = this.count / this.length;
        if (loadFactor < 0.25 && this.length > 7) {
          this.resize(Math.floor(this.length / 2));
        }
        return tupleValue;
      }
    }
    return undefined;
  }
}

const hashtable = new hashTable();
// length = 7
// count = 6
// loadFactor > 0.75
hashtable.put("aaa", 100);
hashtable.put("bbb", 100);
hashtable.put("ccc", 100);
hashtable.put("ddd", 100);
hashtable.put("eee", 100);
hashtable.put("fff", 100);

console.log(hashtable.storage);

// length = 14
// count = 3
// loadFactor < 0.25
hashtable.delete("aaa");
hashtable.delete("bbb");
hashtable.delete("ccc");
hashtable.delete("ddd");
console.log(hashtable.storage);
