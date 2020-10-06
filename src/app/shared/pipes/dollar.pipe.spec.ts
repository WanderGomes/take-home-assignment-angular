import { DollarPipe } from './dollar.pipe';

describe('DollarPipe', () => {

    /**********************
     * Check if the component was created
     *********************/
    it('should create the pipe', () => {
        const pipe = new DollarPipe();
        expect(pipe).toBeTruthy();
    });

    /**********************
     * Check if the component was created
     *********************/
    it('should convert string to Dollar format', () => {
        const pipe = new DollarPipe();
        const value = 123456789;
        const expectedString = '1,234,567.89';
        const result = pipe.transform(value);

        expect(result).toBe(expectedString);
    });
});
