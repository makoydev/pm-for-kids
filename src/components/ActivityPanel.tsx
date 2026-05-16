import { Icon } from "./Icon";

interface ActivityPanelProps {
  collapsed: boolean;
  log: string[];
  onClear: () => void;
  onClose: () => void;
}

export function ActivityPanel({ collapsed, log, onClear, onClose }: ActivityPanelProps) {
  if (collapsed) return null;

  return (
    <aside id="activityPanel" className="activity-panel" aria-label="Activity log">
      <div className="panel-heading">
        <h2>
          <span className="heading-icon purple">
            <Icon name="scroll" />
          </span>
          Activity
        </h2>
        <div className="panel-heading-actions">
          <button className="text-button" type="button" onClick={onClear}>
            <Icon name="trash" />
            Clear
          </button>
          <button className="icon-button" type="button" aria-label="Hide activity panel" onClick={onClose}>
            <Icon name="x" />
          </button>
        </div>
      </div>
      <ol className="activity-log">
        {log.map((item, index) => (
          <li key={`${item}-${index}`}>{item}</li>
        ))}
      </ol>
    </aside>
  );
}
