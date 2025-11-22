import Image from "next/image";
import Link from "next/link";
import styles from "./CategoryCard.module.css";

interface CategoryCardProps {
    name: string;
    image: string;
    href: string;
}

export default function CategoryCard({ name, image, href }: CategoryCardProps) {
    return (
        <Link href={href} className={styles.card}>
            <Image
                src={image}
                alt={name}
                fill
                className={styles.image}
            />
            <div className={styles.overlay}>
                <h3 className={styles.title}>{name}</h3>
            </div>
        </Link>
    );
}
