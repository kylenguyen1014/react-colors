import chroma from 'chroma-js';

export default{
    ColorBox: {
        display: 'inline-block',
        width: '20%',
        height: props => props.showingFullShades ? '25%' : '50%',
        margin: '-2px 0',
        position: 'relative',
        '&:hover button' : {
            opacity: '1',
            transition: '0.3s ease-in',
        }
    },
    showMore: {
        position: 'absolute',
        right: '0px',
        bottom: '0px',
        backgroundColor: 
            props => chroma(props.background).luminance() >= 0.5 ? 
            'rgba(0, 0, 0, 0.3)' :
            'rgba(255, 255, 255, 0.3)',
        padding: '3px 5px',
        color: props => chroma(props.background).luminance() >= 0.5 ? 'black' : 'white',
    },
    ColorBoxName: {
        width: '100%',
        position: 'absolute',
        left:'0px',
        bottom: '0px',
        fontWeight: '100',
        textTransform: 'uppercase',
    },
    CopyButton: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '100px',
        height: '30px',
        border:'none',
        display: 'inline-block',
        opacity: '0',
        marginLeft: '-50px',
        marginTop: '-15px',
        backgroundColor: 'rgba(255, 255, 255, 0.3)', 
        textTransform: 'uppercase',
        color: props => chroma(props.background).luminance() >= 0.5 ? 'black' : 'white',
    },
    ColorBoxAnimate: {
        opacity: '0',
        width: '100%',
        height: '100%',
        zIndex: '0',
        position: 'absolute',
        transition: 'transform 0.5s',
        transform: 'scale(0.1)',
    },
    ColorBoxMsg: {
        opacity: '0',
        color: props => chroma(props.background).luminance() >= 0.5 ? 'black' : 'white',
    },
    show: {
        opacity: '1',
        transform: 'scale(10)',
        zIndex: '10',
    },
    displayMsg: {
        width: '100%',
        position: 'fixed',
        left: '0',
        bottom: '50%',
        opacity: '1',
        transition: 'all 0.4s 0.3s ease-in',
        zIndex: '20',
        textAlign: 'center',
        '& h1': {
            backgroundColor: 
                props => chroma(props.background).luminance() >= 0.5 ? 
                'rgba(0, 0, 0, 0.3)' 
                : 'rgba(255, 255, 255, 0.3)',
            lineHeight: '100px',
            fontSize: '4rem',
            marginBottom: '1rem',
        }
    }
}
