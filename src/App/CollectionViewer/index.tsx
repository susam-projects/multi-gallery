import React from "react";
import { useRouteMatch } from "react-router";

export interface ICollectionViewerRouteParams {
  slug: string;
}

function CollectionViewerPage() {
  const match = useRouteMatch<ICollectionViewerRouteParams>();
  const { slug } = match.params;
  return <div>Collection Viewer Page for collection "{slug}"</div>;
}

export default CollectionViewerPage;
