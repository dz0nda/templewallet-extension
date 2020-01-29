import * as React from "react";
import classNames from "clsx";
import ContentContainer from "app/layout/ContentContainer";

interface ContentProps {
  popup?: boolean;
}

const Content: React.FC<ContentProps> = ({ popup, children }) => (
  <ContentContainer className="flex justify-center mb-8">
    <div
      className={classNames(
        "bg-white w-full px-4 py-8",
        !popup && "max-w-xl rounded overflow-hidden shadow-lg"
      )}
    >
      {children}
    </div>
  </ContentContainer>
);

export default Content;
