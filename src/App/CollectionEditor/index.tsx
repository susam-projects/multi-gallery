import React from "react";
import { useRouteMatch } from "react-router";
import { ICollectionViewerRouteParams } from "../CollectionViewer";

interface ICollectionEditorRouteParams {
  slug: string;
}

function CollectionEditorPage() {
  const match = useRouteMatch<ICollectionViewerRouteParams>();
  const { slug } = match.params;
  return <div>Collection Editor Page for collection {slug}</div>;
}

export default CollectionEditorPage;
