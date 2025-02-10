
import { PieChart, Pie, Cell } from "recharts";
import { Project } from "./types";

interface ProgressChartProps {
  project: Project;
  size: number;
  onClick: (e: React.MouseEvent) => void;
}

const COLORS = ['#0088FE', '#E7E7E7'];

export const ProgressChart = ({ project, size, onClick }: ProgressChartProps) => {
  const data = [
    { value: project.progress },
    { value: 100 - project.progress }
  ];

  return (
    <div className="cursor-pointer relative" onClick={onClick}>
      <PieChart width={size} height={size}>
        <Pie
          data={data}
          innerRadius={size * 0.35}
          outerRadius={size * 0.45}
          startAngle={90}
          endAngle={-270}
          paddingAngle={0}
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
      </PieChart>
      <div 
        className="absolute transform -translate-x-1/2 -translate-y-1/2" 
        style={{ 
          left: '50%', 
          top: '50%',
          fontSize: size * 0.25
        }}
      >
        {project.progress}%
      </div>
    </div>
  );
};

