import React from 'react';
import { Formik, Field, Form, ErrorMessage, FieldProps } from 'formik';
import * as Yup from 'yup';
import { Input } from "@/components/ui/input";
import { Textarea } from '@/components/ui/textarea';
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { useCreateComponentsStore } from '@/store/createComponents/create.components';

import {
  Select as CnSelect,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

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

const categoriesOptions = [
  { value: 'category1', label: 'Category 1ss' },
  { value: 'category2', label: 'Category 2' },
  { value: 'category3', label: 'Category 3' },
];

const tagsOptions = [
  { value: 'tags1', label: 'buttons' },
  { value: 'tags2', label: 'cards' },
  { value: 'tags3', label: 'inputs' },
];

const MultiSelectField = ({ field, form, options }: FieldProps & { options: { value: string, label: string }[] }) => {
  const onChange = (value: string) => {
    const newValue = field.value.includes(value)
      ? field.value.filter((v: string) => v !== value)
      : [...field.value, value];
    form.setFieldValue(field.name, newValue);
  };

  const selectedOptions = options.filter(option => field.value.includes(option.value));

  return (
    <div>
      <CnSelect onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue>
            {selectedOptions.length > 0 ? (
              selectedOptions.map(option => (
                <Badge key={option.value} className="mr-2">{option.label}</Badge>
              ))
            ) : (
              <span>Select options</span>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </CnSelect>
      <input type="hidden" {...field} />
    </div>
  );
};

// const MultiSelectField = ({ field, form, options }: FieldProps & { options: { value: string, label: string }[] }) => {
//   const onChange = (value: string) => {
//     const newValue = field.value.includes(value)
//       ? field.value.filter((v: string) => v !== value)
//       : [...field.value, value];
//     form.setFieldValue(field.name, newValue);
//   };

//   const onRemove = (value: string) => {
//     form.setFieldValue(field.name, field.value.filter((v: string) => v !== value));
//   };

//   const selectedOptions = options.filter(option => field.value.includes(option.value));

//   return (
//     <div>
//       <CnSelect onValueChange={onChange}>
//         <SelectTrigger className="w-full">
//           <SelectValue>
//             {selectedOptions.length > 0 ? (
//               selectedOptions.map(option => (
//                 <Badge key={option.value} className="mr-2 flex items-center">
//                   {option.label}
//                   <button
//                     type="button"
//                     className="ml-2"
//                     onClick={(e) => {
//                       e.stopPropagation();  // Stop event from bubbling up
//                       e.preventDefault();   // Prevent default button behavior
//                       onRemove(option.value);  // Remove the badge
//                     }}
//                   >
//                     <p>Close</p> {/* Adjusted text */}
//                   </button>
//                 </Badge>
//               ))
//             ) : (
//               <span>Select options</span>
//             )}
//           </SelectValue>
//         </SelectTrigger>
//         <SelectContent>
//           <SelectGroup>
//             {options.map((option) => (
//               <SelectItem key={option.value} value={option.value}>
//                 {option.label}
//               </SelectItem>
//             ))}
//           </SelectGroup>
//         </SelectContent>
//       </CnSelect>
//       <input type="hidden" {...field} />
//     </div>
//   );
// };

export function ProfileForm() {
  const viewCreateComponentsStore = useCreateComponentsStore((state) => state.createComponents);
  const setCreateComponentField = useCreateComponentsStore((state) => state.setCreateComponentField);

  const initialValues: FormValues = {
    title: "",
    description: "",
    html: viewCreateComponentsStore.html,
    css: viewCreateComponentsStore.css,
    javascript: viewCreateComponentsStore.javascript,
    categories: [], // No default value for categories
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
          <span>Edit Components</span>
        </HoverBorderGradient>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-5xl">
        <Formik
          initialValues={initialValues}
          validationSchema={formSchema}
          onSubmit={onSubmit}
        >
          {({ handleChange, handleBlur, setFieldValue }) => (
            <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormItem label="Title">
                <Field name="title">
                  {({ field }: FieldProps<string>) => (
                    <Input
                      placeholder="Project Title"
                      {...field}
                      value={field.value}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  )}
                </Field>
                <ErrorMessage name="title" component="p" />
              </FormItem>

              <FormItem label="Folder Name">
                <Field name="folder_name">
                  {({ field }: FieldProps<string>) => (
                    <Input
                      placeholder="Folder Name"
                      {...field}
                      value={field.value}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  )}
                </Field>
                <ErrorMessage name="folder_name" component="p" />
              </FormItem>

              <FormItem label="Description">
                <Field name="description">
                  {({ field }: FieldProps<string>) => (
                    <Textarea
                      placeholder="Project description"
                      {...field}
                      value={field.value}
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
                      value={field.value}
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
                      value={field.value}
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
                      value={field.value}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  )}
                </Field>
                <ErrorMessage name="javascript" component="p" />
              </FormItem>

              <FormItem label="Categories">
                <Field name="categories" component={MultiSelectField} options={categoriesOptions} />
                <ErrorMessage name="categories" component="p" />
              </FormItem>

              <FormItem label="Tags">
                <Field name="tags" component={MultiSelectField} options={tagsOptions} />
                <ErrorMessage name="tags" component="p" />
              </FormItem>

              <FormItem label="Type">
                <Field name="type">
                  {({ field }: FieldProps<string>) => (
                    <CnSelect
                      value={field.value}
                      onValueChange={(value) => setFieldValue(field.name, value)}
                      onBlur={field.onBlur}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="type1">Type 1</SelectItem>
                          <SelectItem value="type2">Type 2</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </CnSelect>
                  )}
                </Field>
                <ErrorMessage name="type" component="p" />
              </FormItem>

              <button type="submit" className="btn-primary">
                Submit
              </button>
            </Form>
          )}
        </Formik>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

const FormItem = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="form-item">
    <label className="form-label">{label}</label>
    {children}
  </div>
);
