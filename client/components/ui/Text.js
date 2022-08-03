import classes from './Text.module.css';


function Text(text) {

  return 
    <span className={classes.text}>
        {text}
    </span>;
}

export default Text;