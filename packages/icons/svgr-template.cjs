const template = (variables, { tpl }) => {
  return tpl`
${variables.imports}

${variables.interfaces}

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

const ${variables.componentName} = ({ size = 14, color = 'currentColor', className, ...props }: IconProps) => (
  ${variables.jsx}
);

${variables.exports}
`;
};

module.exports = template;