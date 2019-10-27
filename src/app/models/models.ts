export class Teacher {
  teacherId: string = '';
  teacherName: string = '';
  teacherTopic: string = '';
  teacherContact: ContactInfo;
}

export class ContactInfo {
  email: string = '';
  contactPhone: number = null;
}

