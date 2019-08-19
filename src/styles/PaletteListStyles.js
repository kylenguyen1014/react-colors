export default {
    root: {  
        background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(29,77,189,1) 0%, rgba(29,99,159,1) 56%, rgba(0,212,255,1) 100%)',
        marginTop: '0',
        padding: '0',
        backgroundSize: 'cover',
        height: '100vh',
        overflow: 'auto',
    },
    main: {
        // height: '90%',
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        // '& h1' : {
        //     // alignSelf: 'flex-start',
        //     marginTop: '0',
        //     padding: '1.5rem 0'
        // },
        margin: '0 auto',

    },
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 30%)', 
        gridGap: '0 5%',
        marginTop: '-2rem'
    },
    header: {
        float: 'right',
        display: 'flex',
        marginTop: '0',
        padding: '1.5rem 0',
        '& a': {
            alignSelf: 'center',
            marginLeft: 'auto',
        }
    }
};