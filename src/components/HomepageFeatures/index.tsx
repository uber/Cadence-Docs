import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Simplify Stateful Application Development',
    Svg: require('@site/static/img/docusaurus/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
Cadence uses workflow primitives to help developers encode complex business logic, while seamlessly managing scalability, reliability, and availability, freeing developers from these concerns      </>
    ),
  },
  {
    title: 'Resilient Workflows in Any Environment',
    Svg: require('@site/static/img/docusaurus/undraw_docusaurus_tree.svg').default,
    description: (
      <>
Cadence uses workflow primitives to help developers encode complex business logic, while seamlessly managing scalability, reliability, and availability, freeing developers from these concerns      </>
    ),
  },
  {
    title: 'Horizontal Scalability for Massive Workflow Loads',
    Svg: require('@site/static/img/docusaurus/undraw_docusaurus_react.svg').default,
    description: (
      <>
Cadence scales horizontally to handle millions of concurrent workflows, and it includes asynchronous history event replication out-of-the-box, providing robust recovery from zone failures
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
