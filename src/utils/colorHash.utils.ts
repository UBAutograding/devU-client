import ColorHash from 'color-hash'

const colorHash = (input: string) => {
    const hash = new ColorHash({hue: 90, saturation: 0.7, lightness: 0.5});
    return hash.hex(input);
}

export default colorHash