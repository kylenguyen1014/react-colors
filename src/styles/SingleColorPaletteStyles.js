import down from '../SizeHelper';

export default {
    
    SinglePalleteColors: {
        height: '90%',
        display: 'flex',
        flexWrap: 'wrap',
        
    },
    SinglePalette: {
        width: '100%',
        height: '100vh',
    },
    goBack: {
        backgroundColor: 'black',
        height: '50%',
        width: '20%',
        display: 'flex',
        position: 'relative',
        margin: '-2px 0',
        justifyContent: 'center',
        alignItems: 'center',        
        '& span':{
            padding: '3px 10px',
            color: 'white',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
        },
        [down('lg')]:{
            height: '33.333%',
            width: '75%'
        },
        [down('md')]:{
            height: '20%',
            width: '50%'
        },
        [down('xs')]:{
            height: '10%',
            width: '100%'
        },
    },
}