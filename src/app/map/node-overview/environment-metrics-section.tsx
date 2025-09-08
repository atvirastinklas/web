import {
  ThermometerIcon,
  DropletsIcon,
  GaugeIcon,
  WindIcon,
  MapPinIcon,
  SunIcon,
  ScaleIcon,
  CloudRainIcon,
  SproutIcon,
  RadioIcon,
} from "lucide-react";
import type { EnvironmentMetrics } from "../contracts";
import { DateUpdatedView } from "../temp-comps/date-updated-view";

const metrics: Array<{
  key: keyof EnvironmentMetrics;
  icon: React.ElementType;
  title: string;
  unit: string;
}> = [
  {
    key: "temperature",
    icon: ThermometerIcon,
    title: "Temperatūra",
    unit: "°C",
  },
  { key: "relativeHumidity", icon: DropletsIcon, title: "Drėgmė", unit: "%" },
  { key: "barometricPressure", icon: GaugeIcon, title: "Slėgis", unit: "hPa" },
  { key: "gasResistance", icon: WindIcon, title: "Dujų varža", unit: "MΩ" },
  { key: "iaq", icon: WindIcon, title: "Oro kokybė", unit: "IAQ" },
  { key: "distance", icon: MapPinIcon, title: "Atstumas", unit: "mm" },
  { key: "lux", icon: SunIcon, title: "Šviesa", unit: "lux" },
  { key: "whiteLux", icon: SunIcon, title: "Balta šviesa", unit: "lux" },
  { key: "irLux", icon: SunIcon, title: "IR šviesa", unit: "lux" },
  { key: "uvLux", icon: SunIcon, title: "UV šviesa", unit: "lux" },
  { key: "windDirection", icon: WindIcon, title: "Vėjo kryptis", unit: "°" },
  { key: "windSpeed", icon: WindIcon, title: "Vėjo greitis", unit: "m/s" },
  { key: "weight", icon: ScaleIcon, title: "Svoris", unit: "kg" },
  { key: "windGust", icon: WindIcon, title: "Vėjo gūsis", unit: "m/s" },
  { key: "windLull", icon: WindIcon, title: "Vėjo atoslūgis", unit: "m/s" },
  { key: "radiation", icon: RadioIcon, title: "Radiacija", unit: "µR/h" },
  {
    key: "rainfall1h",
    icon: CloudRainIcon,
    title: "Krituliai (1h)",
    unit: "mm",
  },
  {
    key: "rainfall24h",
    icon: CloudRainIcon,
    title: "Krituliai (24h)",
    unit: "mm",
  },
  {
    key: "soilMoisture",
    icon: SproutIcon,
    title: "Dirvožemio drėgmė",
    unit: "%",
  },
  {
    key: "soilTemperature",
    icon: ThermometerIcon,
    title: "Dirvožemio temperatūra",
    unit: "°C",
  },
];

export const getEnvironmentMetrics = (data: EnvironmentMetrics | null) => {
  if (data == null) {
    return null;
  }

  return metrics
    .map((metric) => {
      const value = data[metric.key];
      if (value == null) {
        return null;
      }

      return {
        ...metric,
        value,
      };
    })
    .filter((m): m is (typeof metrics)[0] & { value: number } => m != null);
};

interface Props {
  data: EnvironmentMetrics | null;
}

export const EnvironmentMetricsSection = (props: Props) => {
  const metrics = getEnvironmentMetrics(props.data);
  if (props.data == null || metrics == null || metrics.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="flex items-center gap-2 text-base font-medium">
        <ThermometerIcon className="h-4 w-4" />
        Aplinkos matavimai
      </h3>
      <div className="grid grid-cols-2 gap-3 pl-6">
        {metrics.map((item) => {
          const Icon = item.icon;
          const value = props.data?.[item.key as keyof EnvironmentMetrics];

          return (
            <div key={item.key} className="bg-muted/50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Icon className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {item.title}
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-sm font-medium">
                  {typeof value === "number" ? value.toFixed(1) : value}
                </span>
                <span className="text-xs text-muted-foreground">
                  {item.unit}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">Atnaujinta</span>
        <span className="text-sm">
          <DateUpdatedView date={props.data.lastUpdated} />
        </span>
      </div>
    </div>
  );
};
