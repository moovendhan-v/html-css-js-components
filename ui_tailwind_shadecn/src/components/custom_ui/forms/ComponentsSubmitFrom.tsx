import React from 'react';
import { Formik, Field, Form, ErrorMessage, FieldProps } from 'formik';
import * as Yup from 'yup';
import { Input } from "@/components/ui/input";
import { Textarea } from '@/components/ui/textarea';
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { useCreateComponentsStore } from '@/store/createComponents/create.components';

const formSchema = Yup.object().shape({
  title: Yup.string().min(5, "Title must be at least 5 characters.").required("Title is required."),
  description: Yup.string().min(5, "Description must be at least 5 characters.").required("Description is required."),
  html: Yup.string().min(1, "HTML is required.").required("HTML is required."),
  css: Yup.string().min(1, "CSS is required.").required("CSS is required."),
  javascript: Yup.string().min(1, "JavaScript is required.").required("JavaScript is required."),
  categories: Yup.array().of(Yup.string().required()).min(1, "Categories are required.").required("Categories are required."),
  tags: Yup.array().of(Yup.string().required()).min(1, "Tags are required.").required("Tags are required."),
  folder_name: Yup.string().min(5, "Folder name must be at least 5 characters.").required("Folder name is required."),
  type: Yup.string().min(1, "Type is required.").required("Type is required."),
});

interface FormValues {
  title: string;
  description: string;
  html: string;
  css: string;
  javascript: string;
  categories: string[];
  tags: string[];
  folder_name: string;
  type: string;
}

export function ProfileForm() {
  const viewCreateComponentsStore = useCreateComponentsStore((state) => state.createComponents);
  const setCreateComponentField = useCreateComponentsStore((state) => state.setCreateComponentField);

  const initialValues: FormValues = {
    title: "",
    description: "",
    html: viewCreateComponentsStore.html,
    css: viewCreateComponentsStore.css,
    javascript: viewCreateComponentsStore.javascript,
    categories: [],
    tags: [],
    folder_name: "",
    type: "",
  };

  const onSubmit = (values: FormValues) => {
    console.log(values);
    // Update Zustand store on form submit
    // setCreateComponentField(values);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <HoverBorderGradient
          containerClassName="rounded-full"
          as="button"
          className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
        >
          <span>Contribute Components</span>
        </HoverBorderGradient>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-5xl">
        <Formik
          initialValues={initialValues}
          validationSchema={formSchema}
          onSubmit={onSubmit}
        >
          {({ handleChange, handleBlur }: { handleChange: any, handleBlur: any, values: FormValues }) => (
            <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormItem label="Title">
                <Field name="title">
                  {({ field }: FieldProps<string>) => (
                    <Input
                      placeholder="Project Title"
                      {...field}
                      value={field.value}  // No need to cast
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  )}
                </Field>
                <ErrorMessage name="title" component="p" />
              </FormItem>

              <FormItem label="Description">
                <Field name="description">
                  {({ field }: FieldProps<string>) => (
                    <Textarea
                      placeholder="Project description"
                      {...field}
                      value={field.value}  // No need to cast
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  )}
                </Field>
                <ErrorMessage name="description" component="p" />
              </FormItem>

              <FormItem label="HTML">
                <Field name="html">
                  {({ field }: FieldProps<string>) => (
                    <Input
                      placeholder="HTML content"
                      {...field}
                      value={field.value}  // No need to cast
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  )}
                </Field>
                <ErrorMessage name="html" component="p" />
              </FormItem>

              <FormItem label="CSS">
                <Field name="css">
                  {({ field }: FieldProps<string>) => (
                    <Input
                      placeholder="CSS content"
                      {...field}
                      value={field.value}  // No need to cast
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  )}
                </Field>
                <ErrorMessage name="css" component="p" />
              </FormItem>

              <FormItem label="JavaScript">
                <Field name="javascript">
                  {({ field }: FieldProps<string>) => (
                    <Input
                      placeholder="JavaScript content"
                      {...field}
                      value={field.value}  // No need to cast
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  )}
                </Field>
                <ErrorMessage name="javascript" component="p" />
              </FormItem>

              <FormItem label="Folder Name">
                <Field name="folder_name">
                  {({ field }: FieldProps<string>) => (
                    <Input
                      placeholder="Folder Name"
                      {...field}
                      value={field.value}  // No need to cast
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  )}
                </Field>
                <ErrorMessage name="folder_name" component="p" />
              </FormItem>

              <FormItem label="Type">
                <Field name="type">
                  {({ field }: FieldProps<string>) => (
                    <Input
                      placeholder="Type"
                      {...field}
                      value={field.value}  // No need to cast
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  )}
                </Field>
                <ErrorMessage name="type" component="p" />
              </FormItem>

              <AlertDialogFooter>
                {/* <button type="submit">Submit</button> */}
                <AlertDialogCancel>Cancel</AlertDialogCancel>
              </AlertDialogFooter>
            </Form>
          )}
        </Formik>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function FormItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label>{label}</label>
      {children}
    </div>
  );
}
