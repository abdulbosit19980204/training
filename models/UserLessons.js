// models/UserLesson.js
import mongoose from 'mongoose';

const userLessonSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
    completedAt: { type: Date, default: Date.now }
});

const UserLesson = mongoose.model('UserLesson', userLessonSchema);

export default UserLesson;