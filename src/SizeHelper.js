const down = (size) => {
    const sizes = { xs: '576px', sm: '768px', md: '992px', lg: '1400px'};
    return `@media (max-width: ${sizes[size]})`
}

export default down;