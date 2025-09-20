import {
  ThermometerIcon,
  DropletsIcon,
  AntennaIcon,
  WindIcon,
  MapPinIcon,
  SunIcon,
  ScaleIcon,
  CloudRainIcon,
  SproutIcon,
  RadioIcon,
  type LucideProps,
  BatteryIcon,
  BatteryFullIcon,
  BatteryMediumIcon,
  BatteryLowIcon,
  ZapIcon,
  SatelliteDishIcon,
  GaugeIcon,
  TimerIcon,
} from "lucide-react";
import type { metricType, MeshNodeMetric } from "../contracts";
import { formatDuration, intervalToDuration } from "date-fns";
import { lt } from "date-fns/locale";
import { cn } from "@/lib/utils";

type IconProps = LucideProps & { datavalue?: number };

type MetricLabelConfig = {
  icon?: React.ElementType<IconProps>;
  valueTransform?: (value: number) => string;
  title: string;
  orderWeight: number;
  size?: "default" | "large";
  unit?: string;
};

type MetricRecord = Record<(typeof metricType)[number], MetricLabelConfig>;

const defaultTransform = (value: number | string) =>
  typeof value === "number" ? value.toFixed(1) : value;

export const metricLabels = {
  batteryLevel: {
    icon: (props: IconProps) => {
      const level = props.datavalue ?? 0;
      if (level >= 95) return <BatteryFullIcon className="text-green-500" />;
      if (level >= 50)
        return (
          <BatteryMediumIcon
            className={cn({
              "text-yellow-500": level < 80,
              "text-green-500": level >= 80,
            })}
          />
        );
      if (level >= 15)
        return (
          <BatteryLowIcon
            className={cn({
              "text-yellow-500": level > 30,
              "text-red-500": level <= 30,
            })}
          />
        );
      return <BatteryIcon className="text-gray-500" />;
    },
    title: "Baterijos lygis",
    unit: "%",
    orderWeight: 1000,
  },
  voltage: { icon: ZapIcon, title: "Įtampa", unit: "V", orderWeight: 990 },
  current: {
    title: "Srovė",
    unit: "A",
    orderWeight: 985,
  },
  channelUtilization: {
    icon: AntennaIcon,
    title: "Kanalo apkrova",
    unit: "%",
    orderWeight: 980,
  },
  airUtilTx: {
    icon: SatelliteDishIcon,
    title: "Eterio apkrova (TX)",
    unit: "%",
    orderWeight: 970,
  },
  uptimeSeconds: {
    icon: TimerIcon,
    title: "Veikimo laikas",
    valueTransform: (seconds: number) => {
      const duration = intervalToDuration({ start: 0, end: seconds * 1000 });
      return formatDuration(duration, {
        format: ["days", "hours", "minutes"],
        locale: lt,
      });
    },
    size: "large",
    orderWeight: 960,
  },
  temperature: {
    icon: ThermometerIcon,
    title: "Temperatūra",
    unit: "°C",
    orderWeight: 950,
  },
  relativeHumidity: {
    icon: DropletsIcon,
    title: "Drėgmė",
    unit: "%",
    orderWeight: 940,
  },
  barometricPressure: {
    icon: GaugeIcon,
    title: "Slėgis",
    unit: "hPa",
    orderWeight: 930,
  },
  gasResistance: {
    icon: WindIcon,
    title: "Dujų varža",
    unit: "MΩ",
    orderWeight: 920,
  },
  iaq: { icon: WindIcon, title: "Oro kokybė", unit: "IAQ", orderWeight: 910 },
  distance: {
    icon: MapPinIcon,
    title: "Atstumas",
    unit: "mm",
    orderWeight: 900,
  },
  lux: { icon: SunIcon, title: "Šviesa", unit: "lux", orderWeight: 890 },
  whiteLux: {
    icon: SunIcon,
    title: "Balta šviesa",
    unit: "lux",
    orderWeight: 880,
  },
  irLux: { icon: SunIcon, title: "IR šviesa", unit: "lux", orderWeight: 870 },
  uvLux: { icon: SunIcon, title: "UV šviesa", unit: "lux", orderWeight: 860 },
  windDirection: {
    icon: WindIcon,
    title: "Vėjo kryptis",
    unit: "°",
    orderWeight: 850,
  },
  windSpeed: {
    icon: WindIcon,
    title: "Vėjo greitis",
    unit: "m/s",
    orderWeight: 840,
  },
  weight: { icon: ScaleIcon, title: "Svoris", unit: "kg", orderWeight: 830 },
  windGust: {
    icon: WindIcon,
    title: "Vėjo gūsis",
    unit: "m/s",
    orderWeight: 820,
  },
  windLull: {
    icon: WindIcon,
    title: "Vėjo atoslūgis",
    unit: "m/s",
    orderWeight: 810,
  },
  radiation: {
    icon: RadioIcon,
    title: "Radiacija",
    unit: "µR/h",
    orderWeight: 800,
  },
  rainfall1h: {
    icon: CloudRainIcon,
    title: "Krituliai (1h)",
    unit: "mm",
    orderWeight: 790,
  },
  rainfall24h: {
    icon: CloudRainIcon,
    title: "Krituliai (24h)",
    unit: "mm",
    orderWeight: 780,
  },
  soilMoisture: {
    icon: SproutIcon,
    title: "Dirvožemio drėgmė",
    unit: "%",
    orderWeight: 770,
  },
  soilTemperature: {
    icon: ThermometerIcon,
    title: "Dirvožemio temperatūra",
    unit: "°C",
    orderWeight: 760,
  },
} satisfies MetricRecord;

interface Props {
  title: string;
  icon: React.ElementType;
  metrics: MeshNodeMetric[];
}

export const MetricsSection = (props: Props) => {
  const { title, metrics, icon: Icon } = props;

  if (metrics.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="flex items-center gap-2 text-base font-medium">
        <Icon className="h-4 w-4" />
        {title}
      </h3>
      <div className="grid grid-cols-2 gap-3 pl-6">
        {metrics
          .sort((a, b) => {
            const aConfig = metricLabels[
              a.metric
            ] as MetricRecord[keyof MetricRecord];
            const bConfig = metricLabels[
              b.metric
            ] as MetricRecord[keyof MetricRecord];
            return (bConfig?.orderWeight ?? 0) - (aConfig?.orderWeight ?? 0);
          })
          .map((item) => {
            const labelConfig = metricLabels[
              item.metric
            ] as MetricRecord[keyof MetricRecord];
            if (labelConfig == null) {
              return null;
            }
            const Icon = labelConfig.icon;
            const value = item.value;
            if (value == null) {
              return null;
            }

            return (
              <div
                key={`${item.group}-${item.metric}`}
                className={cn("bg-muted/50 p-3 rounded-lg", {
                  "col-span-2": labelConfig.size === "large",
                })}
              >
                <div className="flex items-center gap-1 mb-1 pb-2">
                  {Icon == null ? null : (
                    <Icon
                      className="h-6 w-6 text-muted-foreground"
                      datavalue={value}
                    />
                  )}
                  <span className="text-s text-muted-foreground">
                    {labelConfig.title}
                  </span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-s font-medium">
                    {labelConfig.valueTransform == null
                      ? defaultTransform(value)
                      : labelConfig.valueTransform(value)}
                  </span>
                  {labelConfig.unit == null ? null : (
                    <span className="text-xs text-muted-foreground">
                      {labelConfig.unit}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
