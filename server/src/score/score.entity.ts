import { Quiz } from "src/quiz/quiz.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Score {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nickname: string;

    @Column()
    score: number;

    @CreateDateColumn()
    date: Date;

    @ManyToOne(() => Quiz, quiz => quiz.scores, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'quiz_id' })
    quiz: Quiz;
}
