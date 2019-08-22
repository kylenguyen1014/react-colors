import down from '../SizeHelper';
import bg from './bg.svg';
export default {
    '@global':{
        '.fade-exit':{
            opacity: '1'
        },
        '.fade-exit-active':{
            opacity: '0',
            transition: 'opacity 0.5s ease-out'
        },
        
    },
    root: {  
        // background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(29,77,189,1) 0%, rgba(29,99,159,1) 56%, rgba(0,212,255,1) 100%)',
        marginTop: '0',
        padding: '0',
        backgroundSize: 'cover',
        height: '100vh',
        overflow: 'auto',
        backgroundColor: '#5ac0ff',
        backgroundImage: `url(${bg})`
        /* background by SVGBackgrounds.com */
    },
    main: {
        // height: '90%',
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        margin: '0 auto',
        [down('lg')]:{
            width: '70%'
        },
        [down('md')]:{
            width: '80%'
        },
        [down('xs')]:{
            width: '70%'
        },

    },
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 30%)', 
        gridGap: '0 5%',
        marginTop: '-2rem',
        [down('md')]:{
            gridTemplateColumns: 'repeat(2, 50%)',
            gridGap: '0 3%',
        },
        [down('xs')]:{
            gridTemplateColumns: 'repeat(1, 100%)',
        },
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