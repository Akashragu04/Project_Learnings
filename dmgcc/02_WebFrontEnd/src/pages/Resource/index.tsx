
import React from "react";

const ResourcesOverviewTable = React.lazy(() => import("./ResourcesOverview/ResourcesOverviewTable"));
const ResourcesRecord = React.lazy(()=> import('./ResourcesRecord'));
const Utilization = React.lazy(()=> import('./Utilization'));
const BenchResources = React.lazy(()=> import('./BenchResources'));
const ExternalResourceView = React.lazy(()=> import('./ExternalResource'));
const AddExternalResource = React.lazy(()=> import('./ExternalResource/AddExternalResource'));
const EditExternalResource = React.lazy(()=> import('./ExternalResource/EditExternalResource'));

export const ResourceConfig = [
    {
        path: "/resource/resources-overviewTable",
        element: <ResourcesOverviewTable />,
      },
      {
        path: "/resource/resources-record",
        element: <ResourcesRecord />,
      },
      {
        path: "/resource/utilization",
        element: <Utilization />,
      },
      {
        path: "/resource/bench_resources",
        element: <BenchResources />,
      },
      {
        path: "/resource/external_resource",
        element: <ExternalResourceView />,
      },
      {
        path: "/resource/add_external_resource",
        element: <AddExternalResource />,
      },
      {
        path: "/resource/update_external_resource",
        element: <EditExternalResource />,
      },
    ]