declare module "react-plantuml" {
    import React from "react";

    interface PlantUMLProps {
        src: string;
        alt?: string;
    }

    const PlantUML: React.FC<PlantUMLProps>;

    export default PlantUML;
}
