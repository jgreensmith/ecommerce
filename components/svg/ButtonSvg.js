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
    opacity: 0.4
  }

  & .borderEffect {
    stroke: ${theme.palette.primary.light};
    stroke-width: 0;
    stroke-dasharray: 300 600;
    stroke-dashoffset: 300;
    fill: transparent;
  }

  &:hover,
  &.${buttonUnstyledClasses.focusVisible} {
    .borderEffect {
      stroke: ${theme.palette.primary.light};
      stroke-dashoffset: -600;
      stroke-width: 3;
    }

    .bg {
      fill: transparent;
    }
  }

  &:focus,
  &.${buttonUnstyledClasses.focusVisible} {
    outline: 4px solid ${theme.palette.primary.main};
    outline-offset: 2px;
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
      font-size: 0.875rem;
      font-family: IBM Plex Sans, sans-serif;
      font-weight: 500;
      line-height: 1.5;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--main-color);
      text-transform: uppercase;
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