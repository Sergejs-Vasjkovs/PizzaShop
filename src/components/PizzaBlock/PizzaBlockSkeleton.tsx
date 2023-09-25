import React from 'react';
import ContentLoader from 'react-content-loader';

const PizzaBlockSkeleton: React.FC = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <circle cx="140" cy="170" r="120" />
    <rect x="15" y="0" rx="10" ry="10" width="250" height="30" />
    <rect x="15" y="310" rx="10" ry="10" width="241" height="90" />
    <rect x="15" y="455" rx="10" ry="10" width="115" height="45" />
    <rect x="140" y="455" rx="10" ry="10" width="115" height="45" />
  </ContentLoader>
);

export default PizzaBlockSkeleton;
