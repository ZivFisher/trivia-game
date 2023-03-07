import { FilesType, UseFilesHandler } from '@hilma/fileshandler-server';
import { Body, Controller, Delete, Get, Param, Post, Put, BadRequestException, NotFoundException, Inject, forwardRef, UploadedFiles } from '@nestjs/common';
import { ScoreService } from 'src/score/score.service';
import { CreateQuizDto } from './quiz.dto';
import { QuizService } from './quiz.service';

@Controller('/api/quiz')
export class QuizController {
    constructor(
        @Inject(forwardRef(() => ScoreService))
        private readonly scoreService: ScoreService,
        private readonly quizService: QuizService,
    ) { }

    @Get('/')
    getAll() {
        try {
            return this.quizService.getAll();
        } catch (e) {
            console.log(e + e.message);
            throw new BadRequestException();
        }
    }

    @Get('/:id')
    getById(@Param('id') id: string) {
        try {
            return this.quizService.getQuizDetails(id);
        } catch (e) {
            console.log(e);
            if (e instanceof NotFoundException) {
                throw e;
            } else throw new BadRequestException();
        }
    }

    @Get('/:userId/user-quizzes')
    getUserQuizzes(@Param('userId') userId: string) {
        return this.quizService.getUserQuizzes(userId);
    }

    @Get('/:id/scores')
    getQuizScores(@Param('id') id: string) {
        try {
            return this.scoreService.getScoresByQuizId(id);
        } catch (e) {
            console.log(e);
            if (e instanceof NotFoundException) {
                throw e;
            } else throw new BadRequestException();
        }
    }

    @UseFilesHandler(100)
    @Post('/')
    create(@Body() createdQuiz: CreateQuizDto, @UploadedFiles() files: FilesType) {
        console.log(222222222)
        try {
            return this.quizService.create(createdQuiz, files);
        } catch (e) {
            console.log(e);
            if (e instanceof NotFoundException) {
                throw e;
            } else throw new BadRequestException();
        }
    }

    @Delete('/:id')
    delete(@Param('id') id: string) {
        try {
            return this.quizService.delete(id);
        } catch (e) {
            console.log(e);
            if (e instanceof NotFoundException) {
                throw e;
            } else throw new BadRequestException();
        }
    }

    @Put('/:id')
    update(@Param('id') id: string, @Body() updatedQuiz: CreateQuizDto) {
        try {
            return this.quizService.update(id, updatedQuiz);
        } catch (e) {
            console.log(e);
            if (e instanceof NotFoundException) {
                throw e;
            } else throw new BadRequestException();
        }
    }
}
