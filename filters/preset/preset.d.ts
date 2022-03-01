export declare type PresetKey = keyof typeof presetConfig;
export declare const presetConfig: {
    flower: {
        name: string;
        value: number;
    }[];
    forest: ({
        name: string;
        value: number;
    } | {
        name: string;
        value: {
            preset: number[][];
        };
    })[];
    beach: ({
        name: string;
        value: number;
    } | {
        name: string;
        value: {
            preset: number[][];
        };
    })[];
    sham: ({
        name: string;
        value: number;
    } | {
        name: string;
        value: {
            value: number;
            mode: string;
            fillColor: string;
            preset?: undefined;
        };
    } | {
        name: string;
        value: {
            preset: number[][];
            value?: undefined;
            mode?: undefined;
            fillColor?: undefined;
        };
    })[];
    stalker: ({
        name: string;
        value: {
            preset: number[][];
        };
    } | {
        name: string;
        value: number;
    })[];
    shimmer: ({
        name: string;
        value: number;
    } | {
        name: string;
        value: {
            value: number;
            mode: string;
            fillColor: string;
            preset?: undefined;
        };
    } | {
        name: string;
        value: {
            preset: number[][];
            value?: undefined;
            mode?: undefined;
            fillColor?: undefined;
        };
    })[];
    mold: ({
        name: string;
        value: {
            preset: number[][];
        };
    } | {
        name: string;
        value: number;
    })[];
    style: ({
        name: string;
        value: {
            preset: number[][];
        };
    } | {
        name: string;
        value: number;
    })[];
    cement: ({
        name: string;
        value: {
            preset: number[][];
        };
    } | {
        name: string;
        value: number;
    })[];
    sharp: ({
        name: string;
        value: {
            preset: number[][];
        };
    } | {
        name: string;
        value: number;
    })[];
    corn: ({
        name: string;
        value: number;
    } | {
        name: string;
        value: {
            preset: number[][];
        };
    })[];
    morning: ({
        name: string;
        value: number;
    } | {
        name: string;
        value: {
            minin: number;
            maxin: number;
            minout: number;
            maxout: number;
            midin: number;
            mid: number;
            preset?: undefined;
            value?: undefined;
            mode?: undefined;
            fillColor?: undefined;
        };
    } | {
        name: string;
        value: {
            preset: number[][];
            minin?: undefined;
            maxin?: undefined;
            minout?: undefined;
            maxout?: undefined;
            midin?: undefined;
            mid?: undefined;
            value?: undefined;
            mode?: undefined;
            fillColor?: undefined;
        };
    } | {
        name: string;
        value: {
            value: number;
            mode: string;
            fillColor: string;
            minin?: undefined;
            maxin?: undefined;
            minout?: undefined;
            maxout?: undefined;
            midin?: undefined;
            mid?: undefined;
            preset?: undefined;
        };
    })[];
    ensalat: ({
        name: string;
        value: number;
    } | {
        name: string;
        value: {
            minin: number;
            maxin: number;
            minout: number;
            maxout: number;
            midin: number;
            mid: number;
            preset?: undefined;
        };
    } | {
        name: string;
        value: {
            preset: number[][];
            minin?: undefined;
            maxin?: undefined;
            minout?: undefined;
            maxout?: undefined;
            midin?: undefined;
            mid?: undefined;
        };
    })[];
    berry: ({
        name: string;
        value: number;
    } | {
        name: string;
        value: {
            preset: number[][];
            minin?: undefined;
            maxin?: undefined;
            minout?: undefined;
            maxout?: undefined;
            midin?: undefined;
            mid?: undefined;
        };
    } | {
        name: string;
        value: {
            minin: number;
            maxin: number;
            minout: number;
            maxout: number;
            midin: number;
            mid: number;
            preset?: undefined;
        };
    })[];
    gritty: ({
        name: string;
        value: number;
    } | {
        name: string;
        value: {
            minin: number;
            maxin: number;
            minout: number;
            maxout: number;
            midin: number;
            mid: number;
            preset?: undefined;
        };
    } | {
        name: string;
        value: {
            preset: number[][];
            minin?: undefined;
            maxin?: undefined;
            minout?: undefined;
            maxout?: undefined;
            midin?: undefined;
            mid?: undefined;
        };
    })[];
    sunny: ({
        name: string;
        value: {
            value: number;
            mode: string;
            fillColor: string;
        };
    } | {
        name: string;
        value: number;
    })[];
    film: {
        name: string;
        value: number;
    }[];
    matte: ({
        name: string;
        value: {
            preset: number[][];
        };
    } | {
        name: string;
        value: number;
    })[];
    deep: ({
        name: string;
        value: {
            preset: number[][];
        };
    } | {
        name: string;
        value: number;
    })[];
    aladin: {
        name: string;
        value: {
            preset: number[][];
        };
    }[];
    amber: {
        name: string;
        value: {
            preset: number[][];
        };
    }[];
    anne: ({
        name: string;
        value: number;
    } | {
        name: string;
        value: {
            preset: number[][];
        };
    })[];
    antonio: {
        name: string;
        value: number;
    }[];
    alex: {
        name: string;
        value: number;
    }[];
    bob: {
        name: string;
        value: number;
    }[];
    greg: {
        name: string;
        value: {
            preset: number[][];
        };
    }[];
    hagrid: {
        name: string;
        value: number;
    }[];
    harry: ({
        name: string;
        value: {
            value: number;
            mode: string;
            fillColor: string;
        };
    } | {
        name: string;
        value: number;
    })[];
    ivan: ({
        name: string;
        value: {
            value: number;
            mode: string;
            fillColor: string;
            minin?: undefined;
            maxin?: undefined;
            minout?: undefined;
            maxout?: undefined;
            midin?: undefined;
            mid?: undefined;
        };
    } | {
        name: string;
        value: number;
    } | {
        name: string;
        value: {
            minin: number;
            maxin: number;
            minout: number;
            maxout: number;
            midin: number;
            mid: number;
            value?: undefined;
            mode?: undefined;
            fillColor?: undefined;
        };
    })[];
    jean: ({
        name: string;
        value: {
            minin: number;
            maxin: number;
            minout: number;
            maxout: number;
            midin: number;
            mid: number;
        };
    } | {
        name: string;
        value: number;
    })[];
    josh: {
        name: string;
        value: {
            preset: number[][];
        };
    }[];
    karen: {
        name: string;
        value: {
            preset: number[][];
        };
    }[];
    lucas: {
        name: string;
        value: number;
    }[];
    melissa: {
        name: string;
        value: {
            preset: number[][];
        };
    }[];
    peter: {
        name: string;
        value: {
            preset: number[][];
        };
    }[];
    salomon: ({
        name: string;
        value: {
            preset: number[][];
        };
    } | {
        name: string;
        value: number;
    })[];
    sara: {
        name: string;
        value: number;
    }[];
    sophia: ({
        name: string;
        value: {
            preset: number[][];
        };
    } | {
        name: string;
        value: number;
    })[];
    tony: {
        name: string;
        value: {
            preset: number[][];
        };
    }[];
    agnes: {
        name: string;
        value: number;
    }[];
    conny: ({
        name: string;
        value: number;
    } | {
        name: string;
        value: {
            minin: number;
            maxin: number;
            minout: number;
            maxout: number;
            midin: number;
            mid: number;
        };
    })[];
    gordon: {
        name: string;
        value: number;
    }[];
    harrison: ({
        name: string;
        value: {
            value: number;
            lightColor: string;
            darkColor: string;
        };
    } | {
        name: string;
        value: number;
    })[];
    henry: ({
        name: string;
        value: {
            value: number;
            lightColor: string;
            darkColor: string;
        };
    } | {
        name: string;
        value: number;
    })[];
    logan: ({
        name: string;
        value: number;
    } | {
        name: string;
        value: {
            value: number;
            lightColor: string;
            darkColor: string;
        };
    })[];
    olay: {
        name: string;
        value: number;
    }[];
    porter: ({
        name: string;
        value: number;
    } | {
        name: string;
        value: {
            minin: number;
            maxin: number;
            minout: number;
            maxout: number;
            midin: number;
            mid: number;
        };
    })[];
    tom: {
        name: string;
        value: number;
    }[];
    sampi: ({
        name: string;
        value: {
            value: number;
            lightColor: string;
            darkColor: string;
            minin?: undefined;
            maxin?: undefined;
            minout?: undefined;
            maxout?: undefined;
            midin?: undefined;
            mid?: undefined;
        };
    } | {
        name: string;
        value: {
            minin: number;
            maxin: number;
            minout: number;
            maxout: number;
            midin: number;
            mid: number;
            value?: undefined;
            lightColor?: undefined;
            darkColor?: undefined;
        };
    } | {
        name: string;
        value: number;
    })[];
    vinny: ({
        name: string;
        value: {
            preset: number[][];
        };
    } | {
        name: string;
        value: number;
    })[];
    borg: ({
        name: string;
        value: {
            preset: number[][];
            value?: undefined;
            mode?: undefined;
            fillColor?: undefined;
        };
    } | {
        name: string;
        value: {
            value: number;
            mode: string;
            fillColor: string;
            preset?: undefined;
        };
    })[];
    carl: ({
        name: string;
        value: {
            preset: number[][];
        };
    } | {
        name: string;
        value: number;
    })[];
    coco: {
        name: string;
        value: {
            preset: number[][];
        };
    }[];
    doris: ({
        name: string;
        value: {
            preset: number[][];
        };
    } | {
        name: string;
        value: number;
    })[];
    doug: {
        name: string;
        value: {
            preset: number[][];
        };
    }[];
    earl: ({
        name: string;
        value: number;
    } | {
        name: string;
        value: {
            preset: number[][];
            value?: undefined;
            mode?: undefined;
            fillColor?: undefined;
        };
    } | {
        name: string;
        value: {
            value: number;
            mode: string;
            fillColor: string;
            preset?: undefined;
        };
    })[];
    kevin: ({
        name: string;
        value: {
            preset: number[][];
        };
    } | {
        name: string;
        value: number;
    })[];
    nash: ({
        name: string;
        value: {
            preset: number[][];
            value?: undefined;
            mode?: undefined;
            fillColor?: undefined;
            minin?: undefined;
            maxin?: undefined;
            minout?: undefined;
            maxout?: undefined;
            midin?: undefined;
            mid?: undefined;
        };
    } | {
        name: string;
        value: {
            value: number;
            mode: string;
            fillColor: string;
            preset?: undefined;
            minin?: undefined;
            maxin?: undefined;
            minout?: undefined;
            maxout?: undefined;
            midin?: undefined;
            mid?: undefined;
        };
    } | {
        name: string;
        value: {
            minin: number;
            maxin: number;
            minout: number;
            maxout: number;
            midin: number;
            mid: number;
            preset?: undefined;
            value?: undefined;
            mode?: undefined;
            fillColor?: undefined;
        };
    })[];
    stan: {
        name: string;
        value: {
            preset: number[][];
        };
    }[];
    sun: ({
        name: string;
        value: {
            value: number;
            mode: string;
            fillColor: string;
        };
    } | {
        name: string;
        value: number;
    })[];
    "bd orange": ({
        name: string;
        value: {
            preset: number[][];
        };
    } | {
        name: string;
        value: number;
    })[];
    blues: {
        name: string;
        value: {
            preset: number[][];
        };
    }[];
    country: {
        name: string;
        value: {
            preset: number[][];
        };
    }[];
    lemonpell: {
        name: string;
        value: {
            preset: number[][];
        };
    }[];
    joyful: {
        name: string;
        value: number;
    }[];
    "tiny dc": ({
        name: string;
        value: {
            preset: number[][];
        };
    } | {
        name: string;
        value: number;
    })[];
    sheberios: {
        name: string;
        value: number;
    }[];
    superone: ({
        name: string;
        value: {
            value: number;
            lightColor: string;
            darkColor: string;
            minin?: undefined;
            maxin?: undefined;
            minout?: undefined;
            maxout?: undefined;
            midin?: undefined;
            mid?: undefined;
        };
    } | {
        name: string;
        value: {
            minin: number;
            maxin: number;
            minout: number;
            maxout: number;
            midin: number;
            mid: number;
            value?: undefined;
            lightColor?: undefined;
            darkColor?: undefined;
        };
    })[];
    tonola: ({
        name: string;
        value: {
            value: number;
            lightColor: string;
            darkColor: string;
            minin?: undefined;
            maxin?: undefined;
            minout?: undefined;
            maxout?: undefined;
            midin?: undefined;
            mid?: undefined;
        };
    } | {
        name: string;
        value: {
            minin: number;
            maxin: number;
            minout: number;
            maxout: number;
            midin: number;
            mid: number;
            value?: undefined;
            lightColor?: undefined;
            darkColor?: undefined;
        };
    } | {
        name: string;
        value: number;
    })[];
    reddish: ({
        name: string;
        value: {
            value: number;
            lightColor: string;
            darkColor: string;
        };
    } | {
        name: string;
        value: number;
    })[];
    fellowing: ({
        name: string;
        value: {
            value: number;
            lightColor: string;
            darkColor: string;
            minin?: undefined;
            maxin?: undefined;
            minout?: undefined;
            maxout?: undefined;
            midin?: undefined;
            mid?: undefined;
        };
    } | {
        name: string;
        value: {
            minin: number;
            maxin: number;
            minout: number;
            maxout: number;
            midin: number;
            mid: number;
            value?: undefined;
            lightColor?: undefined;
            darkColor?: undefined;
        };
    } | {
        name: string;
        value: number;
    })[];
    grassland: ({
        name: string;
        value: {
            value: number;
            lightColor: string;
            darkColor: string;
            minin?: undefined;
            maxin?: undefined;
            minout?: undefined;
            maxout?: undefined;
            midin?: undefined;
            mid?: undefined;
        };
    } | {
        name: string;
        value: {
            minin: number;
            maxin: number;
            minout: number;
            maxout: number;
            midin: number;
            mid: number;
            value?: undefined;
            lightColor?: undefined;
            darkColor?: undefined;
        };
    } | {
        name: string;
        value: number;
    })[];
    springs: ({
        name: string;
        value: {
            value: number;
            lightColor: string;
            darkColor: string;
            minin?: undefined;
            maxin?: undefined;
            minout?: undefined;
            maxout?: undefined;
            midin?: undefined;
            mid?: undefined;
        };
    } | {
        name: string;
        value: number;
    } | {
        name: string;
        value: {
            minin: number;
            maxin: number;
            minout: number;
            maxout: number;
            midin: number;
            mid: number;
            value?: undefined;
            lightColor?: undefined;
            darkColor?: undefined;
        };
    })[];
    justblues: ({
        name: string;
        value: {
            value: number;
            lightColor: string;
            darkColor: string;
            minin?: undefined;
            maxin?: undefined;
            minout?: undefined;
            maxout?: undefined;
            midin?: undefined;
            mid?: undefined;
        };
    } | {
        name: string;
        value: {
            minin: number;
            maxin: number;
            minout: number;
            maxout: number;
            midin: number;
            mid: number;
            value?: undefined;
            lightColor?: undefined;
            darkColor?: undefined;
        };
    } | {
        name: string;
        value: number;
    })[];
    bluesteel: ({
        name: string;
        value: {
            value: number;
            lightColor: string;
            darkColor: string;
            minin?: undefined;
            maxin?: undefined;
            minout?: undefined;
            maxout?: undefined;
            midin?: undefined;
            mid?: undefined;
        };
    } | {
        name: string;
        value: {
            minin: number;
            maxin: number;
            minout: number;
            maxout: number;
            midin: number;
            mid: number;
            value?: undefined;
            lightColor?: undefined;
            darkColor?: undefined;
        };
    })[];
    flowerpot: ({
        name: string;
        value: {
            value: number;
            lightColor: string;
            darkColor: string;
            minin?: undefined;
            maxin?: undefined;
            minout?: undefined;
            maxout?: undefined;
            midin?: undefined;
            mid?: undefined;
        };
    } | {
        name: string;
        value: {
            minin: number;
            maxin: number;
            minout: number;
            maxout: number;
            midin: number;
            mid: number;
            value?: undefined;
            lightColor?: undefined;
            darkColor?: undefined;
        };
    } | {
        name: string;
        value: number;
    })[];
    stinker: ({
        name: string;
        value: {
            value: number;
            lightColor: string;
            darkColor: string;
            minin?: undefined;
            maxin?: undefined;
            minout?: undefined;
            maxout?: undefined;
            midin?: undefined;
            mid?: undefined;
        };
    } | {
        name: string;
        value: {
            minin: number;
            maxin: number;
            minout: number;
            maxout: number;
            midin: number;
            mid: number;
            value?: undefined;
            lightColor?: undefined;
            darkColor?: undefined;
        };
    } | {
        name: string;
        value: number;
    })[];
    violiin: ({
        name: string;
        value: number;
    } | {
        name: string;
        value: {
            value: number;
            lightColor: string;
            darkColor: string;
            minin?: undefined;
            maxin?: undefined;
            minout?: undefined;
            maxout?: undefined;
            midin?: undefined;
            mid?: undefined;
        };
    } | {
        name: string;
        value: {
            minin: number;
            maxin: number;
            minout: number;
            maxout: number;
            midin: number;
            mid: number;
            value?: undefined;
            lightColor?: undefined;
            darkColor?: undefined;
        };
    })[];
    blupur: ({
        name: string;
        value: {
            value: number;
            lightColor: string;
            darkColor: string;
        };
    } | {
        name: string;
        value: number;
    })[];
    beyllo: ({
        name: string;
        value: number;
    } | {
        name: string;
        value: {
            minin: number;
            maxin: number;
            minout: number;
            maxout: number;
            midin: number;
            mid: number;
            value?: undefined;
            lightColor?: undefined;
            darkColor?: undefined;
            preset?: undefined;
        };
    } | {
        name: string;
        value: {
            value: number;
            lightColor: string;
            darkColor: string;
            minin?: undefined;
            maxin?: undefined;
            minout?: undefined;
            maxout?: undefined;
            midin?: undefined;
            mid?: undefined;
            preset?: undefined;
        };
    } | {
        name: string;
        value: {
            preset: number[][];
            minin?: undefined;
            maxin?: undefined;
            minout?: undefined;
            maxout?: undefined;
            midin?: undefined;
            mid?: undefined;
            value?: undefined;
            lightColor?: undefined;
            darkColor?: undefined;
        };
    })[];
    wifortress: ({
        name: string;
        value: {
            value: number;
            lightColor: string;
            darkColor: string;
            minin?: undefined;
            maxin?: undefined;
            minout?: undefined;
            maxout?: undefined;
            midin?: undefined;
            mid?: undefined;
        };
    } | {
        name: string;
        value: number;
    } | {
        name: string;
        value: {
            minin: number;
            maxin: number;
            minout: number;
            maxout: number;
            midin: number;
            mid: number;
            value?: undefined;
            lightColor?: undefined;
            darkColor?: undefined;
        };
    })[];
    vib: ({
        name: string;
        value: number;
    } | {
        name: string;
        value: {
            minin: number;
            maxin: number;
            minout: number;
            maxout: number;
            midin: number;
            mid: number;
            preset?: undefined;
            value?: undefined;
            lightColor?: undefined;
            darkColor?: undefined;
        };
    } | {
        name: string;
        value: {
            preset: number[][];
            minin?: undefined;
            maxin?: undefined;
            minout?: undefined;
            maxout?: undefined;
            midin?: undefined;
            mid?: undefined;
            value?: undefined;
            lightColor?: undefined;
            darkColor?: undefined;
        };
    } | {
        name: string;
        value: {
            value: number;
            lightColor: string;
            darkColor: string;
            minin?: undefined;
            maxin?: undefined;
            minout?: undefined;
            maxout?: undefined;
            midin?: undefined;
            mid?: undefined;
            preset?: undefined;
        };
    })[];
    ranguit: ({
        name: string;
        value: number;
    } | {
        name: string;
        value: {
            minin: number;
            maxin: number;
            minout: number;
            maxout: number;
            midin: number;
            mid: number;
            value?: undefined;
            lightColor?: undefined;
            darkColor?: undefined;
        };
    } | {
        name: string;
        value: {
            value: number;
            lightColor: string;
            darkColor: string;
            minin?: undefined;
            maxin?: undefined;
            minout?: undefined;
            maxout?: undefined;
            midin?: undefined;
            mid?: undefined;
        };
    })[];
    rangeen: ({
        name: string;
        value: number;
    } | {
        name: string;
        value: {
            minin: number;
            maxin: number;
            minout: number;
            maxout: number;
            midin: number;
            mid: number;
            value?: undefined;
            lightColor?: undefined;
            darkColor?: undefined;
            preset?: undefined;
        };
    } | {
        name: string;
        value: {
            value: number;
            lightColor: string;
            darkColor: string;
            minin?: undefined;
            maxin?: undefined;
            minout?: undefined;
            maxout?: undefined;
            midin?: undefined;
            mid?: undefined;
            preset?: undefined;
        };
    } | {
        name: string;
        value: {
            preset: number[][];
            minin?: undefined;
            maxin?: undefined;
            minout?: undefined;
            maxout?: undefined;
            midin?: undefined;
            mid?: undefined;
            value?: undefined;
            lightColor?: undefined;
            darkColor?: undefined;
        };
    })[];
    creamlow: ({
        name: string;
        value: number;
    } | {
        name: string;
        value: {
            minin: number;
            maxin: number;
            minout: number;
            maxout: number;
            midin: number;
            mid: number;
            value?: undefined;
            lightColor?: undefined;
            darkColor?: undefined;
            preset?: undefined;
        };
    } | {
        name: string;
        value: {
            value: number;
            lightColor: string;
            darkColor: string;
            minin?: undefined;
            maxin?: undefined;
            minout?: undefined;
            maxout?: undefined;
            midin?: undefined;
            mid?: undefined;
            preset?: undefined;
        };
    } | {
        name: string;
        value: {
            preset: number[][];
            minin?: undefined;
            maxin?: undefined;
            minout?: undefined;
            maxout?: undefined;
            midin?: undefined;
            mid?: undefined;
            value?: undefined;
            lightColor?: undefined;
            darkColor?: undefined;
        };
    })[];
    sven: ({
        name: string;
        value: number;
    } | {
        name: string;
        value: {
            minin: number;
            maxin: number;
            minout: number;
            maxout: number;
            midin: number;
            mid: number;
        };
    })[];
    yenely: ({
        name: string;
        value: number;
    } | {
        name: string;
        value: {
            minin: number;
            maxin: number;
            minout: number;
            maxout: number;
            midin: number;
            mid: number;
            preset?: undefined;
        };
    } | {
        name: string;
        value: {
            preset: number[][];
            minin?: undefined;
            maxin?: undefined;
            minout?: undefined;
            maxout?: undefined;
            midin?: undefined;
            mid?: undefined;
        };
    })[];
    ragwarm: ({
        name: string;
        value: number;
    } | {
        name: string;
        value: {
            minin: number;
            maxin: number;
            minout: number;
            maxout: number;
            midin: number;
            mid: number;
            value?: undefined;
            lightColor?: undefined;
            darkColor?: undefined;
            preset?: undefined;
        };
    } | {
        name: string;
        value: {
            value: number;
            lightColor: string;
            darkColor: string;
            minin?: undefined;
            maxin?: undefined;
            minout?: undefined;
            maxout?: undefined;
            midin?: undefined;
            mid?: undefined;
            preset?: undefined;
        };
    } | {
        name: string;
        value: {
            preset: number[][];
            minin?: undefined;
            maxin?: undefined;
            minout?: undefined;
            maxout?: undefined;
            midin?: undefined;
            mid?: undefined;
            value?: undefined;
            lightColor?: undefined;
            darkColor?: undefined;
        };
    })[];
    greered: {
        name: string;
        value: number;
    }[];
    danligter: ({
        name: string;
        value: number;
    } | {
        name: string;
        value: {
            minin: number;
            maxin: number;
            minout: number;
            maxout: number;
            midin: number;
            mid: number;
            value?: undefined;
            lightColor?: undefined;
            darkColor?: undefined;
            preset?: undefined;
        };
    } | {
        name: string;
        value: {
            value: number;
            lightColor: string;
            darkColor: string;
            minin?: undefined;
            maxin?: undefined;
            minout?: undefined;
            maxout?: undefined;
            midin?: undefined;
            mid?: undefined;
            preset?: undefined;
        };
    } | {
        name: string;
        value: {
            preset: number[][];
            minin?: undefined;
            maxin?: undefined;
            minout?: undefined;
            maxout?: undefined;
            midin?: undefined;
            mid?: undefined;
            value?: undefined;
            lightColor?: undefined;
            darkColor?: undefined;
        };
    })[];
    trotto: ({
        name: string;
        value: number;
    } | {
        name: string;
        value: {
            minin: number;
            maxin: number;
            minout: number;
            maxout: number;
            midin: number;
            mid: number;
            value?: undefined;
            lightColor?: undefined;
            darkColor?: undefined;
            preset?: undefined;
        };
    } | {
        name: string;
        value: {
            value: number;
            lightColor: string;
            darkColor: string;
            minin?: undefined;
            maxin?: undefined;
            minout?: undefined;
            maxout?: undefined;
            midin?: undefined;
            mid?: undefined;
            preset?: undefined;
        };
    } | {
        name: string;
        value: {
            preset: number[][];
            minin?: undefined;
            maxin?: undefined;
            minout?: undefined;
            maxout?: undefined;
            midin?: undefined;
            mid?: undefined;
            value?: undefined;
            lightColor?: undefined;
            darkColor?: undefined;
        };
    })[];
    rasky: ({
        name: string;
        value: number;
    } | {
        name: string;
        value: {
            value: number;
            lightColor: string;
            darkColor: string;
        };
    })[];
    garage: {
        name: string;
        value: number;
    }[];
    travelster: ({
        name: string;
        value: number;
    } | {
        name: string;
        value: {
            minin: number;
            maxin: number;
            minout: number;
            maxout: number;
            midin: number;
            mid: number;
            preset?: undefined;
            value?: undefined;
            lightColor?: undefined;
            darkColor?: undefined;
        };
    } | {
        name: string;
        value: {
            preset: number[][];
            minin?: undefined;
            maxin?: undefined;
            minout?: undefined;
            maxout?: undefined;
            midin?: undefined;
            mid?: undefined;
            value?: undefined;
            lightColor?: undefined;
            darkColor?: undefined;
        };
    } | {
        name: string;
        value: {
            value: number;
            lightColor: string;
            darkColor: string;
            minin?: undefined;
            maxin?: undefined;
            minout?: undefined;
            maxout?: undefined;
            midin?: undefined;
            mid?: undefined;
            preset?: undefined;
        };
    })[];
    strawberry: {
        name: string;
        value: {
            value: number;
            mode: string;
            fillColor: string;
        };
    }[];
    clementine: {
        name: string;
        value: {
            value: number;
            mode: string;
            fillColor: string;
        };
    }[];
    pear: {
        name: string;
        value: {
            value: number;
            mode: string;
            fillColor: string;
        };
    }[];
    apple: {
        name: string;
        value: {
            value: number;
            mode: string;
            fillColor: string;
        };
    }[];
    blueberry: {
        name: string;
        value: {
            value: number;
            mode: string;
            fillColor: string;
        };
    }[];
    grapes: {
        name: string;
        value: {
            value: number;
            mode: string;
            fillColor: string;
        };
    }[];
    dragon: {
        name: string;
        value: {
            value: number;
            mode: string;
            fillColor: string;
        };
    }[];
    punch: ({
        name: string;
        value: {
            preset: number[][];
        };
    } | {
        name: string;
        value: number;
    })[];
    bright: ({
        name: string;
        value: number;
    } | {
        name: string;
        value: {
            minin: number;
            maxin: number;
            minout: number;
            maxout: number;
            midin: number;
            mid: number;
        };
    })[];
    contrast: ({
        name: string;
        value: number;
    } | {
        name: string;
        value: {
            minin: number;
            maxin: number;
            minout: number;
            maxout: number;
            midin: number;
            mid: number;
        };
    })[];
    vivid: {
        name: string;
        value: number;
    }[];
    clairify: {
        name: string;
        value: number;
    }[];
};
