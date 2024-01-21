//Its a debouncing query from react query for better performance.
import { useEffect, useState } from "react";

export default function useDebounce<T>(value: T, delay: number): T {

    const[debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        //update debounced value after delay
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);


        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}