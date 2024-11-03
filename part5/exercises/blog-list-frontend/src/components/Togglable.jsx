import PropTypes from 'prop-types';
import { forwardRef, useImperativeHandle, useState } from 'react';

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return { toggleVisibility };
  });

  return visible ? (
    <>
      {props.children} <button onClick={toggleVisibility}>Cancel</button>
    </>
  ) : (
    <button onClick={toggleVisibility}>{props.buttonLabel}</button>
  );
});

Togglable.displayName = 'Togglable';

Togglable.propTypes = {
  children: PropTypes.element.isRequired,
  buttonLabel: PropTypes.string.isRequired
};

export default Togglable;
