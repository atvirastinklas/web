import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowUpRight, MapIcon } from "lucide-react";
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import Link from "next/link";

export const Hero = () => {
    return (
        <div className="min-h-[calc(100vh-4rem)] w-full flex items-center justify-center overflow-hidden border-b border-accent">
            <div className="max-w-screen-xl w-full flex flex-col lg:flex-row mx-auto items-center justify-between gap-y-14 gap-x-10 px-6 py-12 lg:py-0">
                <div className="max-w-xl">
                    <h1 className="mt-6 max-w-[20ch] text-3xl xs:text-4xl sm:text-5xl lg:text-[2.75rem] xl:text-5xl font-bold !leading-[1.2] tracking-tight">
                        Kurkime atvirą tinklą
                    </h1>
                    <p className="mt-6 max-w-[60ch] xs:text-lg">
                        Mes siekiame sukurti atvirą ryšio tinklą, kuriuo galėtų naudotis visi - tiek nelaimės atveju, tiek paprastam bendravimui. Tai nepriklausoma, savarankiška sistema, veikianti be interneto ir mobiliojo ryšio.
                    </p>
                    <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">
                        <Link href="/docs" className={buttonVariants({ size: "lg", className: "w-full sm:w-auto text-base" })}>
                            Prisijunk prie tinklo <ArrowUpRight className="!h-5 !w-5" />
                        </Link>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="w-full sm:w-auto text-base shadow-none disabled:pointer-events-auto cursor-not-allowed"
                                    disabled
                                >
                                    <MapIcon className="!h-5 !w-5" /> Žemėlapis
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Kuriama</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>
                <div className="relative lg:max-w-lg xl:max-w-xl w-full bg-accent rounded-xl aspect-square">
                    <Image
                        src="/hero.jpg"
                        fill
                        alt="Antena ant stiebo"
                        className="object-cover rounded-xl"
                    />
                </div>
            </div>
        </div>
    );
};
