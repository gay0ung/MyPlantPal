interface PlantImageProps {
    src: string;
    alt: string;
}

const PlantImage = ({ src, alt }: PlantImageProps) => {
    return (
        <div className="relative w-80 h-80 bg-stone-200">
            <img src={src} alt={alt} className="w-full h-full object-cover" />
        </div>
    );
};

export default PlantImage;
