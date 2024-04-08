import React, { useEffect, useRef } from "react";
import Prism from "prismjs";
import PropTypes from "prop-types";

const PrismCode = (props) => {
  const ref = useRef();

  useEffect(() => {
    highlight();
  }, []);

  const highlight = () => {
    if (ref && ref.current) {
      Prism.highlightElement(ref.current);
    }
  };

  const { code, language } = props;
  return (
    <React.Fragment>
      <pre className="line-numbers">
        <code ref={ref} className={`language-${language}`}>
          {code.trim()}
        </code>
      </pre>
    </React.Fragment>
  );
};

// Add prop-types for typechecking
PrismCode.propTypes = {
  code: PropTypes.string,
  language: PropTypes.string,
  plugins: PropTypes.array,
};

export default PrismCode;
