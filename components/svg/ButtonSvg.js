import * as React from 'react';
import PropTypes from 'prop-types';
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';

const ButtonRoot = React.forwardRef(function ButtonRoot(props, ref) {
  const { children, ...other } = props;

  return (
    <svg width="300" height="50" {...other} ref={ref}>
      <polygon points="0,50 0,0 300,0 300,50" className="bg" />
      <polygon points="0,50 0,0 300,0 300,50" className="borderEffect" />
      <foreignObject x="0" y="0" width="300" height="50">
        <div className="content">{children}</div>
      </foreignObject>
    </svg>
  );
});

ButtonRoot.propTypes = {
  children: PropTypes.node,
}

const CustomButtonRoot = styled(ButtonRoot)(
  ({ theme }) => `
  overflow: visible;
  cursor: pointer;
  --main-color: ${theme.palette.primary.main};
  

  & polygon {
    fill: transparent;
    transition: all 800ms ease;
    pointer-events: none;
  }
  
  & .bg {
    stroke: var(--main-color);
    stroke-width: 2;
    filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.1));
    fill: ${theme.palette.primary.main};
    opacity: 0.5
  }

  & .borderEffect {
    stroke: ${theme.palette.secondary.main};
    stroke-width: 0;
    stroke-dasharray: 300 600;
    stroke-dashoffset: 300;
    fill: transparent;
  }

  &:hover,
  &.${buttonUnstyledClasses.focusVisible} {
    .borderEffect {
      stroke: ${theme.palette.secondary.main};
      stroke-dashoffset: -600;
      stroke-width: 3;
    }

    .bg {
      fill: transparent;
      stroke: ${theme.palette.secondary.main};

    }
    .content {
      color: ${theme.palette.secondary.main}
    }
  }

  &:focus,
  &.${buttonUnstyledClasses.focusVisible} {
    outline: none;
    
  }

  &.${buttonUnstyledClasses.active} { 
    & .bg {
      fill: var(--active-color);
      transition: fill 300ms ease-out;
    }
  }

  & foreignObject {
    pointer-events: none;

    & .content {
      font-size: 1.2rem;
      font-family: IBM Plex Sans, sans-serif;
      font-weight: 600;
      line-height: 1.5;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${theme.palette.primary.text};
      text-transform: capitalize;
    }

    & svg {
      margin: 0 5px;
    }
  }`,
);

const SvgButton = React.forwardRef(function SvgButton(props, ref) {
    return <ButtonUnstyled {...props} component={CustomButtonRoot} ref={ref} />;
  });
  
  

  export default SvgButton;