const arrayReverse = (array: unknown[]): unknown[] => {
    let start = 0;
    let end = array.length - 1;

    while (end > start){
        let temp: unknown = array[start];
        array[start] = array[end];
        array[end] = temp;
        start++;
        end--;
    }

    return array;
}